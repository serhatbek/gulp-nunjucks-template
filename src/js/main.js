const pc = (function () {
  "use strict";

  const namespace = "pc";
  const modules = [];
  const plugins = [];

  const classes = {
    current: "current",
    hidden: "is-hidden",
    transition: "has-transition",
  };

  const $objs = {}; // optional shared DOM references

  const getWindowSize = () => window.innerWidth;

  const registerModule = (name, module) => {
    if (typeof module.init === "function") {
      modules.push({ name, module });
    }
  };

  const initModules = () => {
    modules.forEach(({ name, module }) => {
      if (!module.isInitialized || !module.isInitialized()) {
        module.init();
      }
    });
  };

  const registerPlugin = (func, selector, params = {}) => {
    plugins.push({ func, selector, params });
  };

  const bindPlugins = () => {
    plugins.forEach(({ func, selector, params }) => {
      if (typeof func === "function") {
        document.querySelectorAll(selector).forEach((el) => {
          func(el, params);
        });
      } else {
        console.warn(
          `[${namespace}] Plugin function not found for: ${selector}`
        );
      }
    });
  };

  // Example Module: Tab View
  const tabview = (function () {
    let initialized = false;

    const init = () => {
      if (initialized) return;

      document.querySelectorAll(".tab-menu a").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetSelector = link.getAttribute("href");
          const target = document.querySelector(targetSelector);

          const parent = link.closest("li");
          if (parent) {
            parent.classList.add(classes.current);
            parent.parentElement.querySelectorAll("li").forEach((sibling) => {
              if (sibling !== parent) {
                sibling.classList.remove(classes.current);
              }
            });
          }

          document
            .querySelectorAll(".tab-container > .tab-content")
            .forEach((tab) => {
              tab.style.display = "none";
            });

          if (target) {
            target.style.display = "block";
          }
        });
      });

      initialized = true;
    };

    return {
      init,
      isInitialized: () => initialized,
    };
  })();

  // Register module
  registerModule("tabview", tabview);

  // Public API
  return {
    namespace,
    classes,
    $objs,
    getWindowSize,
    registerModule,
    registerPlugin,
    initModules,
    bindPlugins,
  };
})();

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  pc.initModules();
  pc.bindPlugins();
});
