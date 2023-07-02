import glob from "glob";
import { Router } from "express";

export function RegisterRoutes(router: Router) {
    const routes = glob.sync(__dirname + "/Routes/**/*.routes.*");
    routes.map(route => register(route, router));
}

function register(routePath: string, router: Router) {
    const route = require(routePath);
    route.register(router);
}