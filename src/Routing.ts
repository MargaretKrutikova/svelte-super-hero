import { Router } from "crayon"

export enum Route {
  Search = "/",
  Battle = "/battle"
}

export const createBattleRoute = (ids: number[]) =>
  `${Route.Battle}?ids=${ids.join(",")}`

export const isValidRoute = (route: string) => {
  const basePath = route.split("?")[0]
  return !!Object.values(Route).find(val => val === basePath)
}

export const navigateToRoute = (nav: Router, route: string) => {
  if (isValidRoute(route)) {
    nav.navigate(route)
  }
}

export const handleInternalLinkClick = (
  nav: Router,
  route: string,
  event: MouseEvent
) => {
  // make sure the user can use ctrl keys to open links in new tabs
  if (!event.defaultPrevented && !event.metaKey && !event.ctrlKey) {
    event.preventDefault()
    navigateToRoute(nav, route)
  }
}
