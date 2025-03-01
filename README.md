# ntrap Telegram

A userscript for removing distractions from Telegram Web.

## Description

This script helps make the Telegram Web interface more minimalist and less distracting by hiding unnecessary elements and features. You can customize which interface elements should be hidden.

## Features

- Hide Stories
- Hide Main Menu
- Hide Global Search
- Hide Gifts Tab
- Hide Similar Channels
- Hide &quot;Send a Gift&quot; button
- Hide Emoji button
- Hide Voice Message button
- Hide Stickers (with option to show on click)
- Filter messages by user
- Hide Comment buttons
- Hide Reactions
- Hide View counters

## Installation

As the script is under development, to use it:

1. Install a userscript manager extension:

   - [Tampermonkey](https://www.tampermonkey.net/) for Chrome, Edge, Firefox, Opera
   - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for Firefox
   - [Violentmonkey](https://violentmonkey.github.io/) for Chrome, Firefox, Edge

2. Create a new script in your installed extension

3. Copy and paste the entire script code into the editor

4. Save the script

5. Open or refresh [Telegram Web](https://web.telegram.org/)

## Usage

After installation, the script will automatically apply the default settings. You can change settings through your extension menu:

1. Click on your userscript extension icon
2. Find &quot;Untrap Telegram&quot; in the list
3. Open the commands menu (usually shown as a gear icon)
4. Toggle options on/off as needed

### User Filtering

> [!NOTE]
> This feature is not available now. API is subject to change. I tryna test this locally, before pushing.

If user filtering is enabled:

- Click this button to hide messages from that user
- To see messages from a blocked user again, click the unblock button (✓)
- To clear the entire blocked users list, use the &quot;Clear blocked users list&quot; command in the script menu

### Stickers

If sticker hiding is enabled:

- Click on the placeholder to see the sticker

## Default Settings

| Feature                             | Default Status |
| ----------------------------------- | -------------- |
| Hide Stories                        | Enabled        |
| Hide Main Menu                      | Disabled       |
| Hide Global Search                  | Disabled       |
| Hide Gifts Tab                      | Enabled        |
| Hide Similar Channels               | Enabled        |
| Hide &quot;Send a Gift&quot; button | Enabled        |
| Hide Emoji button                   | Disabled       |
| Hide Voice Message button           | Enabled        |
| Hide Stickers                       | Enabled        |
| User Filtering                      | Disabled       |
| Hide Comment buttons                | Enabled        |
| Hide Reactions                      | Enabled        |
| Hide View counters                  | Enabled        |

## Limitations

- The script may stop working when Telegram Web interface is updated
- Some features might not work correctly in certain situations
- The script does not sync settings between devices

## Development

This script is in active development. If you have suggestions for improvements or find a bug, please contact the author.

## Privacy

The script works entirely client-side and does not send any data to third-party servers. All settings are saved locally in your browser.
