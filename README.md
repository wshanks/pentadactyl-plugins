# Pentadactyl Plugins
The files in this repository contain plugins for the [Pentadactyl](5digits.org) add-on for Firefox.  Short descriptions of the plugins are given below.  More detail is provided in the documentation contained within the plugins (accessible via the `:help` command in Pentadactyl).

## Tweetdeck
This plugin provides commands that select the columns in [Tweetdeck](tweetdeck.com).  With a column selected, all of Pentadactyl's scrolling commands work (e.g. `gg`, `<Space>`, etc.).  It is still useful to set `<Right>` and `<Left>` as passkeys to switch the selected tweet since this plugin's column selection does not scroll the screen horizontally as it selects the columns.

## Brief
This plugin provides commands that execute most of Brief's default keyboard shortcuts (so they can be easily remapped to values that do not conflict with common Pentadactyl commands; new non-conflicting mappings are also included) as well as allow navigation through Brief (selecting different feeds, toggling folders open/closed, updating individual feeds...).