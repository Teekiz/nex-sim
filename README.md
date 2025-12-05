# Old School Runescape Nex Loot Simulator

A simulator designed to simulate Old School Runescapes Boss Nex's drops.

The simulator can be found [here](https://teekiz.github.io/nex-sim/).

## Features

Includes customisable input options:

- Contribution range (between 0% to 100%) to capture damage contribution. <br>
![Contribution gif](https://github.com/Teekiz/nex-sim/blob/master/readmefiles/contribution.gif)
- Team sizes ranges supporting solos to masses (up to 60 players).
- Dynamic MVP simulation based on the contribution and team size (Higher damage in smaller teams improves chances of receiving MVP status).
- Simulates multiple kills automatically until one of the selected conditions is met:
  - Kill count met
  - Shards received
  - Uniques received
  - Pet received
  - All selected items are received
  - Until the collection log has been completed (green log)
<br>![Teamsize and conditions gif](https://github.com/Teekiz/nex-sim/blob/master/readmefiles/teamsizeconditions.gif)
- A collection log to display the quantity of items received.
- An item log to display all items received alongside the drop count they were received at.
  <br>![Collection log and item log gif](https://github.com/Teekiz/nex-sim/blob/master/readmefiles/collectionlog.gif)

- Player stats including: 
  - Total uniques.
  - Shards per drop
  - Actual drop rate (Total uniques / kill count)
  - MVP percentage
  - Current and longest dry streaks.
    <br>![Collection log and item log gif](https://github.com/Teekiz/nex-sim/blob/master/readmefiles/stats.gif)

## Feedback

Any feedback is welcome including feature requests and bug reports. Please submit feedback [here](https://github.com/Teekiz/nex-sim/issues/new).

## Credits

- [Runestar](https://github.com/RuneStar/fonts) - Old School Runescape Fonts.
- [Old School RuneScape Wiki]() - Source of all OSRS images, icons and drop table information. See [here](https://oldschool.runescape.wiki/w/Nex) for more information.
