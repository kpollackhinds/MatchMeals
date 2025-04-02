import { Href, Router } from "expo-router";

const handleNavigation = (router: Router, route: Href) => {
  router.push(route);
};

export { handleNavigation };
