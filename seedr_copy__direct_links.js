// ==UserScript==
// @name         Seeder Copy Links
// @namespace    https://github.com/Neokyuubi/seedr-copy-direct-links-at-once
// @supportURL   https://github.com/Neokyuubi/seedr-copy-direct-links-at-once/issues
// @version      0.5
// @description  Copy direct Links inside a folder
// @author       Neokyuubi
// @match        https://www.seedr.cc/*
// @grant        GM_setClipboard
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
    'use strict';
    var elements = [];
    var links = "";
    var sleep = (delay) => new Promise((resolve)=>setTimeout(resolve, delay));

    async function seedr()
    {
        try
        {
            $("span .fa.fa-copy").each(function(index)
            {
                elements.push($(this));
            });

            for (let i = 0; i < elements.length; i++)
            {
                await sleep(250);
                elements[i].parent().parent().parent().parent().contextmenu();
                await sleep(250);
                let text = $("#clipboard-div").attr("data-clipboard");
                //  filter here if mp4 or mkv
                links += (i<elements.length -1) ? text + "\n" : text;
            }
            //console.log(links);
            GM_setClipboard(links);
        }
        catch(err)
        {
            console.log("errors : " + err);
        }

    }

    $(document).bind('keypress', function(event) {
        if( event.which === 81 && event.shiftKey)
        {
            event.preventDefault();
            setTimeout(function()
            {
               seedr();
            }, 100);
        }
    });

})();
