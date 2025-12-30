export function bricksRegistry(eleventyConfig) {

  // Brick Registry System
  // Global registry to track dependencies per page
  const brickRegistry = new Map();

  // Helper to get or create page registry
  function getPageRegistry(page) {
    const pageUrl = page.url || page.outputPath || 'default';
    if (!brickRegistry.has(pageUrl)) {
      brickRegistry.set(pageUrl, {
        dependencies: new Set(),  // Raw dependencies (URLs) - categorized later
        inlineStyles: new Set(),
        inlineScripts: new Set()
      });
    }
    return brickRegistry.get(pageUrl);
  }

  // Clear registry before each build
  eleventyConfig.on("eleventy.before", async () => {
    brickRegistry.clear();
  });

  // brick shortcode: registers and renders a brick component
  eleventyConfig.addShortcode("brick", function(brickModule) {
    const registry = getPageRegistry(this.page);
    
    if (!brickModule) return '';
    
    // Register external dependencies (categorized later in transform)
    if (brickModule.dependencies) {
      brickModule.dependencies.forEach(dep => {
        registry.dependencies.add(dep);
      });
    }
    
    // Register inline styles directly from style variable
    if (brickModule.style && brickModule.style.trim()) {
      registry.inlineStyles.add(brickModule.style);
    }
    
    // Register inline scripts directly from script variable
    if (brickModule.script && brickModule.script.trim()) {
      registry.inlineScripts.add(brickModule.script);
    }
    
    // Render the brick using render() macro
    if (brickModule.render && typeof brickModule.render === 'function') {
      return brickModule.render();
    }
    
    return '';
  });

  // bricksRegistry shortcode: outputs placeholder and base dependencies
  eleventyConfig.addShortcode("bricksRegistry", function(dependencies = []) {
    const registry = getPageRegistry(this.page);
    
    // Register root dependencies if provided (categorized later in transform)
    if (dependencies && Array.isArray(dependencies)) {
      dependencies.forEach(dep => {
        registry.dependencies.add(dep);
      });
    }
    
    // Return placeholder comment that will be replaced by transform
    return '<!-- BRICK_DEPENDENCIES_PLACEHOLDER -->';
  });

  // Transform to inject collected dependencies
  eleventyConfig.addTransform("injectBrickDependencies", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    const pageUrl = this.page?.url || this.page?.outputPath || outputPath;
    const registry = brickRegistry.get(pageUrl);

    if (!registry || !content.includes('<!-- BRICK_DEPENDENCIES_PLACEHOLDER -->')) {
      return content;
    }

    // Categorize dependencies by type
    const externalStyles = [];
    const externalScripts = [];
    
    registry.dependencies.forEach(dep => {
      // Categorize by type
      if (dep.endsWith('.css') || dep.includes('.css?')) {
        externalStyles.push(dep);
      } else if (dep.endsWith('.js') || dep.includes('.js?')) {
        externalScripts.push(dep);
      }
    });

    // Build HTML for dependencies
    let dependenciesHtml = '\n';
    
    // Add external CSS links
    externalStyles.forEach(href => {
      dependenciesHtml += `  <link rel="stylesheet" href="${href}">\n`;
    });
    
    // Add inline styles
    registry.inlineStyles.forEach(style => {
      dependenciesHtml += `  <style>${style}</style>\n`;
    });
    
    // Add external script links
    externalScripts.forEach(src => {
      dependenciesHtml += `  <script src="${src}"></script>\n`;
    });
    
    // Add inline scripts
    registry.inlineScripts.forEach(script => {
      dependenciesHtml += `  <script>${script}</script>\n`;
    });
    
    dependenciesHtml += '  ';

    // Replace placeholder with actual dependencies
    return content.replace('<!-- BRICK_DEPENDENCIES_PLACEHOLDER -->', dependenciesHtml);
  });
}
