// ==UserScript==
// @name         Untrap Telegram
// @namespace    http://tampermonkey.net/
// @version      0.0.0
// @description  Removing distractions from Telegram Web
// @author       You
// @match        https://web.telegram.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=telegram.org
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==

(function() {
    'use strict'
  
    const NAME = 'Undistract Telegram Web'
    // const STORAGE_KEY = 'undistract-telegram-settings'
    const BLOCKED_USERS_KEY = 'undistract-telegram-blocked-users'
  
    let blockedUsers = JSON.parse(GM_getValue(BLOCKED_USERS_KEY, '{}'))
  
    const HIDE_STORIES = useOption('hide_stories', 'Hide Stories', true);
    const HIDE_MAIN_MENU = useOption('hide_main_menu', 'Hide Main Menu', false);
    const HIDE_SEARCH = useOption('hide_search', 'Hide Global Search', false);
    const HIDE_GIFTS_TAB = useOption('hide_gifts', 'Hide Gifts Tab', true);
    const HIDE_SIMILAR_CHANNELS = useOption('hide_similar', 'Hide Similar Channels', true);
    const HIDE_SEND_GIFT_BUTTON = useOption('hide_send_gift', 'Hide Send a Gift Button', true);
    const HIDE_EMOJI_BUTTON = useOption('hide_emoji_button', 'Hide Emoji Button', false);
    const HIDE_VOICE_BUTTON = useOption('hide_voice_button', 'Hide Voice Message Button', true);
    const HIDE_STICKERS = useOption('hide_stickers', 'Hide Stickers', true);
    const ENABLE_USER_FILTER = useOption('enable_user_filter', 'Enable User Filtering', false);
    const HIDE_COMMENTS = useOption('hide_comments', 'Hide Comment Buttons', true);
    const HIDE_REACTIONS = useOption('hide_reactions', 'Hide Reactions', true);
    const HIDE_VIEWS = useOption('hide_views', 'Hide View Counter', true);
  
    function useOption(key, title, defaultValue) {
      let value = GM_getValue(key, defaultValue)
      const ref = {
        get value() {
          return value
        },
        set value(v) {
          value = v
          GM_setValue(key, v)
          location.reload()
        },
      }
  
      GM_registerMenuCommand(`${title}: ${value ? '✅' : '❌'}`, () => {
        ref.value = !value
      })
  
      return ref
    }
  
    GM_registerMenuCommand('Clear blocked users list', () => {
      blockedUsers = {}
      GM_setValue(BLOCKED_USERS_KEY, JSON.stringify(blockedUsers))
      alert('Blocked users list cleared')
      location.reload()
    })
  
    function hideStories() {
      if (!HIDE_STORIES.value)
        return
  
      const storiesButton = document.getElementById('StoryToggler')
      if (storiesButton) {
        storiesButton.style.display = 'none'
        console.log(`[${NAME}] Stories button hidden`)
      }
    }
  
    function hideReactions() {
      if (!HIDE_REACTIONS.value) return;
  
      const reactions = document.querySelectorAll('.Reactions .message-reaction');
      reactions.forEach(reaction => {
        reaction.style.display = 'none';
        console.log(`[${NAME}] Reaction hidden`);
      });
    }
  
    function hideViews() {
      if (!HIDE_VIEWS.value) return;
  
      const views = document.querySelectorAll('.message-views, .icon-channelviews');
      views.forEach(view => {
        view.style.display = 'none';
        console.log(`[${NAME}] Views hidden`);
      });
    }
  
    function hideMainMenu() {
      if (!HIDE_MAIN_MENU.value)
        return
  
      const mainMenuButton = document.querySelector('.DropdownMenu.main-menu')
      if (mainMenuButton) {
        mainMenuButton.style.display = 'none'
        console.log(`[${NAME}] Main menu button hidden`)
      }
    }
  
    function hideSearch() {
      if (!HIDE_SEARCH.value)
        return
  
      const searchInput = document.querySelector('.SearchInput')
      if (searchInput) {
        searchInput.style.display = 'none'
        console.log(`[${NAME}] Search input hidden`)
      }
    }
  
    function hideGiftsTab() {
      if (!HIDE_GIFTS_TAB.value)
        return
  
      const giftsTab = document.querySelector('a[href$="/gifts"]')
      if (giftsTab) {
        giftsTab.style.display = 'none'
        console.log(`[${NAME}] Gifts tab hidden`)
      }
  
      const giftsContent = document.querySelector('.content.gifts-list')
      if (giftsContent) {
        let parent = giftsContent
        while (parent && !parent.classList.contains('shared-media')) {
          parent = parent.parentElement
        }
  
        if (parent) {
          parent.style.display = 'none'
          console.log(`[${NAME}] Gifts content hidden`)
        }
      }
    }
  
    function hideSimilarChannels() {
      if (!HIDE_SIMILAR_CHANNELS.value)
        return
  
      const similarChannelsContent = document.querySelector('.content.similarChannels-list')
      if (similarChannelsContent) {
        similarChannelsContent.style.display = 'none'
        console.log(`[${NAME}] Similar Channels content hidden`)
      }
    }
  
    function hideSendGiftButton() {
      if (!HIDE_SEND_GIFT_BUTTON.value)
        return
  
      const menuItems = document.querySelectorAll('.MenuItem')
      menuItems.forEach((item) => {
        if (item.textContent.includes('Send a Gift')) {
          item.style.display = 'none'
          console.log(`[${NAME}] Send a Gift button hidden`)
        }
      })
    }
  
    function hideComments() {
      const commentButtons = document.querySelectorAll('.CommentButton');
  
      commentButtons.forEach(button => {
        if (!button.classList.contains('comment-dualed')) {
          button.classList.add('comment-dualed');
  
          button.style.display = 'none';
  
          console.log('Comment button hidden');
  
          const post = button.closest('.Message');
          if (post) {
            const commentSection = post.querySelector('.comments-container, .message-comments-list');
            if (commentSection) {
              commentSection.style.display = 'none';
              console.log('Comments section hidden');
            }
          }
        }
      });
    }
  
    function hideEmojiButton() {
      if (!HIDE_EMOJI_BUTTON.value)
        return
  
      const emojiButton = document.querySelector('.Button.symbol-menu-button')
      if (emojiButton) {
        emojiButton.style.display = 'none'
        console.log(`[${NAME}] Emoji button hidden`)
      }
    }
  
    function hideVoiceButton() {
      if (!HIDE_VOICE_BUTTON.value)
        return
  
      const voiceButton = document.querySelector('.Button.record.main-button')
      if (voiceButton) {
        voiceButton.style.display = 'none'
        console.log(`[${NAME}] Voice button hidden`)
      }
    }
  
    function processStickers() {
      if (!HIDE_STICKERS.value)
        return
  
      const stickerContainers = document.querySelectorAll('.message-content.no-text.custom-shape')
  
      stickerContainers.forEach((container) => {
        const stickerMedia = container.querySelector('.sticker-media')
  
        if (stickerMedia && !container.classList.contains('sticker-processed')) {
          const originalContent = container.innerHTML
  
          const placeholder = document.createElement('div')
          placeholder.className = 'sticker-placeholder'
          placeholder.style.cssText = 'padding: 10px; text-align: center; cursor: pointer; background-color: rgba(0, 0, 0, 0.05); border-radius: 8px;'
          placeholder.innerHTML = '<span style="color: var(--color-text-secondary);">Message contains a sticker. Click to show.</span>'
  
          const contentInner = container.querySelector('.content-inner')
          if (contentInner) {
            contentInner.style.display = 'none'
  
            container.insertBefore(placeholder, contentInner)
  
            placeholder.addEventListener('click', () => {
              placeholder.style.display = 'none'
              contentInner.style.display = ''
            })
  
            container.classList.add('sticker-processed')
            console.log(`[${NAME}] Sticker hidden and replaced with placeholder`)
          }
        }
      })
    }
  
    function processUserFilter() {
      if (!ENABLE_USER_FILTER.value)
        return
  
      const messageGroups = document.querySelectorAll('.sender-group-container')
  
      messageGroups.forEach((group) => {
        const avatar = group.querySelector('.Avatar.interactive')
  
        if (avatar) {
          const userId = avatar.getAttribute('data-peer-id')
  
          if (userId && blockedUsers[userId]) {
            group.style.display = 'none'
            console.log(`[${NAME}] Hidden message from blocked user ID: ${userId}`)
          } else {
            if (!group.querySelector('.block-user-button')) {
              const blockButton = document.createElement('button')
              blockButton.className = 'block-user-button'
              blockButton.title = blockedUsers[userId] ? 'Unblock user' : 'Hide messages from this user'
              blockButton.innerHTML = blockedUsers[userId] ? '✓' : '✕'
              blockButton.style.cssText = 'position: absolute; top: 0; right: -25px; background: none; border: none; cursor: pointer; font-size: 16px; color: var(--color-text-secondary); z-index: 1000;'
  
              blockButton.addEventListener('click', () => {
                if (blockedUsers[userId]) {
                  delete blockedUsers[userId]
                  blockButton.innerHTML = '✕'
                  blockButton.title = 'Hide messages from this user'
                  group.style.display = ''
                } else {
                  blockedUsers[userId] = true
                  blockButton.innerHTML = '✓'
                  blockButton.title = 'Unblock user'
                  group.style.display = 'none'
                }
  
                GM_setValue(BLOCKED_USERS_KEY, JSON.stringify(blockedUsers))
                console.log(`[${NAME}] User ID ${userId} ${blockedUsers[userId] ? 'blocked' : 'unblocked'}`)
              })
  
              const avatarContainer = group.querySelector('.UPrRM3Ks')
              if (avatarContainer) {
                avatarContainer.style.position = 'relative'
                avatarContainer.appendChild(blockButton)
              }
            }
          }
        }
      })
    }
  
    function injectStyle() {
      const style = document.createElement('style')
      style.innerHTML = [
          HIDE_STORIES.value && `
          #StoryToggler {
              display: none !important;
          }`,
          HIDE_MAIN_MENU.value && `
          .DropdownMenu.main-menu {
              display: none !important;
          }`,
          HIDE_SEARCH.value && `
          .SearchInput {
              display: none !important;
          }`,
          HIDE_GIFTS_TAB.value && `
              a[href$="/gifts"] {
                  display: none !important;
              }
  
              .content.gifts-list,
              .Tab[data-content="gifts"] {
                  display: none !important;
              }`,
          HIDE_SIMILAR_CHANNELS.value && `
              .content.similarChannels-list {
                  display: none !important;
              }`,
          HIDE_SEND_GIFT_BUTTON.value && `
              .MenuItem:has(i.icon-gift) {
                  display: none !important;
              }`,
          HIDE_EMOJI_BUTTON.value && `
              .Button.symbol-menu-button {
                  display: none !important;
              }`,
          HIDE_VOICE_BUTTON.value && `
              .Button.record.main-button {
                  display: none !important;
              }`,
          ENABLE_USER_FILTER.value && `
              .UPrRM3Ks {
                  position: relative;
              }
              .block-user-button {
                  opacity: 0.3;
                  transition: opacity 0.2s;
              }
              .UPrRM3Ks:hover .block-user-button {
                  opacity: 1;
              }`,
          HIDE_COMMENTS.value && `
              .CommentButton {
                  display: none !important;
              }`,
          HIDE_REACTIONS.value && `
              .Reactions .message-reaction {
                  display: none !important;
              }`,
          HIDE_VIEWS.value && `
          .message-views, .icon-channelviews {
              display: none !important;
          }
          `,
        ]
        .filter(Boolean)
        .join('\n')
      document.head.appendChild(style)
    }
  
    function observeDOM() {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            if (HIDE_STORIES.value) {
              const storiesButton = document.getElementById('StoryToggler')
              if (storiesButton) {
                hideStories()
              }
            }
  
            if (HIDE_MAIN_MENU.value) {
              const mainMenuButton = document.querySelector('.DropdownMenu.main-menu')
              if (mainMenuButton) {
                hideMainMenu()
              }
            }
  
            if (HIDE_SEARCH.value) {
              const searchInput = document.querySelector('.SearchInput')
              if (searchInput) {
                hideSearch()
              }
            }
  
            if (HIDE_GIFTS_TAB.value) {
              const giftsTab = document.querySelector('a[href$="/gifts"]')
              if (giftsTab) {
                hideGiftsTab()
              }
  
              const giftsContent = document.querySelector('.content.gifts-list')
              if (giftsContent) {
                hideGiftsTab()
              }
            }
  
            if (HIDE_SIMILAR_CHANNELS.value) {
              const similarChannelsContent = document.querySelector('.content.similarChannels-list')
              if (similarChannelsContent) {
                hideSimilarChannels()
              }
            }
  
            if (HIDE_SEND_GIFT_BUTTON.value) {
              const menuItems = document.querySelectorAll('.MenuItem')
              if (menuItems.length) {
                hideSendGiftButton()
              }
            }
  
            if (HIDE_EMOJI_BUTTON.value) {
              const emojiButton = document.querySelector('.Button.symbol-menu-button')
              if (emojiButton) {
                hideEmojiButton()
              }
            }
  
            if (HIDE_VOICE_BUTTON.value) {
              const voiceButton = document.querySelector('.Button.record.main-button')
              if (voiceButton) {
                hideVoiceButton()
              }
            }
  
            if (HIDE_STICKERS.value) {
              const stickerContainers = document.querySelectorAll('.message-content.no-text.custom-shape')
              if (stickerContainers.length) {
                processStickers()
              }
            }
  
            if (ENABLE_USER_FILTER.value) {
              const messageGroups = document.querySelectorAll('.sender-group-container')
              if (messageGroups.length) {
                processUserFilter()
              }
            }
  
            if (HIDE_COMMENTS.value) {
              const commentButtons = document.querySelectorAll('.CommentButton')
              if (commentButtons.length) {
                hideComments()
              }
            }
  
            if (HIDE_REACTIONS.value) {
              const reactions = document.querySelectorAll('.Reactions .message-reaction')
              if (reactions.length) {
                hideReactions()
              }
            }
  
            if (HIDE_VIEWS.value) {
              const views = document.querySelectorAll('.message-views, .icon-channelviews')
              if (views.length) {
                hideViews()
              }
            }
          }
        }
      })
  
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
  
      return observer
    }
  
    function init() {
      console.log(`[${NAME}] Initializing...`)
  
      injectStyle()
  
      if (HIDE_STORIES.value) {
        hideStories()
      }
  
      if (HIDE_MAIN_MENU.value) {
        hideMainMenu()
      }
  
      if (HIDE_SEARCH.value) {
        hideSearch()
      }
  
      if (HIDE_GIFTS_TAB.value) {
        hideGiftsTab()
      }
  
      if (HIDE_SIMILAR_CHANNELS.value) {
        hideSimilarChannels()
      }
  
      if (HIDE_SEND_GIFT_BUTTON.value) {
        hideSendGiftButton()
      }
  
      if (HIDE_EMOJI_BUTTON.value) {
        hideEmojiButton()
      }
  
      if (HIDE_VOICE_BUTTON.value) {
        hideVoiceButton()
      }
  
      if (HIDE_STICKERS.value) {
        processStickers()
      }
  
      if (ENABLE_USER_FILTER.value) {
        processUserFilter()
      }
  
      if (HIDE_COMMENTS.value) {
        hideComments()
      }
  
      if (HIDE_REACTIONS.value) {
        hideReactions()
      }
  
      if (HIDE_VIEWS.value) {
        hideViews()
      }
  
      const observer = observeDOM()
  
      console.log(`[${NAME}] Initialized successfully`)
  
      return {
        hideStories,
        hideMainMenu,
        hideSearch,
        hideGiftsTab,
        hideSimilarChannels,
        hideSendGiftButton,
        hideReactions,
        hideViews,
        hideEmojiButton,
        hideVoiceButton,
        hideComments,
        processStickers,
        processUserFilter,
        observer,
      }
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init)
    } else {
      init()
    }
  })()
