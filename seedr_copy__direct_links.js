// ==UserScript==
// @name         Seedr Copy Links.
// @namespace    https://github.com/Neokyuubi/seedr-copy-direct-links-at-once
// @supportURL   https://github.com/Neokyuubi/seedr-copy-direct-links-at-once/issues
// @updateURL    https://raw.githubusercontent.com/Neokyuubi/seedr-copy-direct-links-at-once/master/seedr_copy__direct_links.js
// @downloadURL  https://raw.githubusercontent.com/Neokyuubi/seedr-copy-direct-links-at-once/master/seedr_copy__direct_links.js
// @require      https://unpkg.com/sweetalert@2.1.2/dist/sweetalert.min.js
// @version      1.2
// @description  Copy direct Links inside a Folder.
// @author       Neokyuubi
// @match        https://www.seedr.cc/*
// @grant        GM_setClipboard
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements, swal */

(function() {
    'use strict';
    let elements = [];
    let links = "";
    let sleep = (delay) => new Promise((resolve)=>setTimeout(resolve, delay));

    async function seedr()
    {
        try
        {
            jQuery.unique($("span .fa.fa-copy")).each(function(index)
            {
                elements.push($(this));
            });
            console.log(elements);
            for (let i = 0; i < elements.length; i++)
            {
                await sleep(250);
                elements[i].parent().parent().parent().parent().contextmenu();
                await sleep(250);
                let text = $("#clipboard-div").attr("data-clipboard");
                //  filter here if mp4 or mkv
                links += (i<elements.length -1) ? text + "\n" : text;
            }
            console.log(links);
            GM_setClipboard(links);
            swal("Links are copied successfully!", elements.length + " links are copied", "success");
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
               elements = [];
               links = "";
               seedr();
            }, 100);
        }
    });

})();
