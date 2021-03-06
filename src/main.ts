import svelte from "crayon-svelte"
import crayon from "crayon"
import { Route } from "./Routing"
import SearchPage from "./SearchPage.svelte"
import BattlePage from "./BattlePage.svelte"

const outlet = document.body
const app = crayon.create()

app.use(svelte.router(outlet))

app.path(Route.Search, (request, res) => {
  window.scrollTo(0, 0)
  res.mount(SearchPage, { request, nav: app })
})

app.path(Route.Battle, (request, res) => {
  window.scrollTo(0, 0)
  res.mount(BattlePage, { request, nav: app })
})

app.load()

export default app
