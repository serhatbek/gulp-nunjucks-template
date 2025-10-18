var site = site || {};

(function (app) {
  app.namespace = "site";
  app.$objs = {
    body: document.body,
  };
  app.modules = [];

  /* --------------------------------------------------
   * Example Module
   * -------------------------------------------------- */
  const exampleModule = () => {
    console.log("Example module initialized");
    // Add your module logic here
  };
  app.modules.push(exampleModule);

  /* --------------------------------------------------
   * Initialize App
   * -------------------------------------------------- */
  app.init = function () {
    app.modules.forEach((module) => {
      try {
        module();
      } catch (err) {
        console.error("Module failed:", module.name, err);
      }
    });
  };
})(site);

document.addEventListener("DOMContentLoaded", () => site.init());
