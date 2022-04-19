import "./db.js";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import UserHandler from "./handlers/UserHandler.js";
import CardHandler from "./handlers/CardHandler.js";
import DashboardHandler from "./handlers/DashboardHandler.js";

// @ts-ignore
const app = yargs(hideBin(process.argv))
    //User commands    
    .command("add-user [name] [email] [pass]", "Register a new user", {}, UserHandler.addUser)
    .command("list-users", "Show all the users", {}, UserHandler.listUsers)
    //Card commands
    .command("add-card [title] [desc] [userId]", "Register a card", {}, CardHandler.addCard)
    .command("move-card-to-pending [id]", "Change a card status", {}, CardHandler.moveCardToPending)
    .command("move-card-to-in-progress [id]", "Change a card status", {}, CardHandler.moveCardToInProgress)
    .command("move-card-to-done [id]", "Change a card status", {}, CardHandler.moveCardToDone)
    //Dashboard commands
    .command("show-dashboard", "Show the dashboard", {}, DashboardHandler.showDashboard)
    .demandCommand(1, "Must provide at least one command")

try {
    app.parse()
} catch(e) {
    console.error(e)
}