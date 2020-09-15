// ==UserScript==
// @name         Seeder Copy Links
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Copy direct links
// @author       Neokyuubi
// @match        https://www.seedr.cc/*
// @grant        GM_setClipboard
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
    'use strict';
    var listo = [];
    var textoo = "";
    var sleep = (delay) => new Promise((resolve)=>setTimeout(resolve, delay));

    async function gogo()
    {
        try
        {
            $("span .fa.fa-copy").each(function(index)
            {
                listo.push($(this));
            });

            for (let i = 0; i < listo.length; i++)
            {
                await sleep(250);
                listo[i].parent().parent().parent().parent().contextmenu();
                await sleep(250);
                let text = $("#clipboard-div").attr("data-clipboard");
                //  filter here if mp4 or mkv
                textoo += (i<listo.length -1) ? text + "\n" : text;
            }
            //console.log(textoo);
            GM_setClipboard(textoo);
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
               gogo();
            }, 100);
        }
    });

})();
