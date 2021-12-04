            function getColorGamut() {
                // rec2020 includes p3 and p3 includes srgb
                for (const gamut of ['rec2020', 'p3', 'srgb']){
                    if (matchMedia(`(color-gamut: ${gamut})`).matches) {
                      return gamut
                    }
                }
                return undefined
            };

            function GetColorGamput() {
                var output = document.getElementById ("outputCG");
                output.innerHTML = "Information about Color Gamut " + getColorGamut();
            };

            function GetColorDepth() {
                var output = document.getElementById ("outputCD");
                output.innerHTML = "Information about Color Depth " + window.screen.colorDepth;
            };

            function GetCPU () {
                var output = document.getElementById ("outputCPU");
                output.innerHTML = "Information about the OS and CPU: " + navigator.oscpu;
                output.innerHTML += "<br />The class of CPU: " + navigator.cpuClass;
                output.innerHTML += "<br />System platform: " + navigator.platform;
            }

            const ContrastPreference = {
                "Less": -1,
                "None": 0,
                "More": 1,
                // "Max" can be added in future
                "ForcedColors": 10,
            };

            function getContrastPreference() {
                if (doesMatch('no-preference')) {
                    return ContrastPreference.None
                }
                if (doesMatch('high') || doesMatch('more')) {
                    return ContrastPreference.More
                }
                if (doesMatch('low') || doesMatch('less')) {
                    return ContrastPreference.Less
                }
                if (doesMatch('forced')) {
                    return ContrastPreference.ForcedColors
                }
                return undefined
            }

            function doesMatch(value) {
                return matchMedia(`(prefers-contrast: ${value})`).matches
            }

            function GetConstrastPreference () {
                var output = document.getElementById ("outputCP");
                output.innerHTML = "Information about Constrast Preference " + getContrastPreference();
            }

            function GetCookies(){
                var output = document.getElementById ("outputCookies");
                const d = document
                try {
                    // Create cookie
                    d.cookie = 'cookietest=1; SameSite=Strict;'
                    const result = d.cookie.indexOf('cookietest=') !== -1
                    // Delete cookie
                    d.cookie = 'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT'
                    output.innerHTML = "Cookies Enabled";
                } catch (e) {
                    output.innerHTML = "Cookies not enabled"
                }
            }

            function GetDeviceMemory(){
                var output = document.getElementById ("outputDM");
                output.innerHTML = "Information about Device Memory " + navigator.deviceMemory;
            };

            function doesColorMatch(value) {
                return matchMedia(`(forced-colors: ${value})`).matches
            }

            function GetForcedColors(){
                var output = document.getElementById ("outputFC");
                if (doesColorMatch("active")){
                    output.innerHTML = "Information about Forced Colors: true";
                }
                else if (doesColorMatch("none")){
                    output.innerHTML = "Information about Forced Colors: false";
                }
                else{
                    output.innerHTML = "Information about Forced Colors: undefined";
                }
            };

            function GetHardwareConcnurrency(){
                var output = document.getElementById ("outputHC");
                output.innerHTML = "Information about Hardware Concurrency " + navigator.hardwareConcurrency;
            };

            function doesHDRMatch(value) {
                return matchMedia(`(dynamic-range: ${value})`).matches
            };

            function GetHDR(){
                var output = document.getElementById ("outputHDR");
                if (doesColorMatch("high")){
                    output.innerHTML = "Information about HDR: true";
                }
                else if (doesColorMatch("standard")){
                    output.innerHTML = "Information about HDR: false";
                }
                else{
                    output.innerHTML = "Information about FHDR: undefined";
                }
            };

            function doesInvertedMatch(value) {
                return matchMedia(`(inverted-colors: ${value})`).matches
            };

            function GetInvertedColors(){
                var output = document.getElementById ("outputInvertedC");
                if (doesColorMatch("inverted")){
                    output.innerHTML = "Information about Inverted Colors: true";
                }
                else if (doesColorMatch("none")){
                    output.innerHTML = "Information about Inverted Colors: false";
                }
                else{
                    output.innerHTML = "Information about Inverted Colors: undefined";
                }
            };

            function GetLanguages(){
                var output = document.getElementById ("outputLanguages");
                output.innerHTML = "Language: " + navigator.language + ", userLanguage: " + navigator.userLanguage + ", browserLanguage: " + navigator.browserLanguage + ", systemLanguage: " + navigator.systemLanguage;
            };

            function GetLocalStorage(){
                var output = document.getElementById ("outputLocalStorage");
                try {
                    output.innerHTML = "Local storage: " + !!window.localStorage
                } catch (e) {
                    /* SecurityError when referencing it means it exists */
                    output.innerHTML = "Local Storage: True";
                }
            };

            function getMonochromeDepth(){
                var output = document.getElementById ("outputMonochrome");
                if (!matchMedia('(min-monochrome: 0)').matches) {
                    // The media feature isn't supported by the browser
                    output.innerHTML = "Monocrhome: Undefined";
                    return;
                }

                // A variation of binary search algorithm can be used here.
                // But since expected values are very small (≤10), there is no sense in adding the complexity.
                for (let i = 0; i <= 100; ++i) {
                    if (matchMedia(`(max-monochrome: ${i})`).matches) {
                        output.innerHTML = "Monochrome: " + i;
                        return;
                    }
                }

                output.innerHTML = "Monochrome: Too high";
                return;
            };

            function getOpenDatabases(){
                var output = document.getElementById ("outputOpenDB");
                output.innerHTML = "Open Databases: " + !!window.openDatabase
            };

            function getPlatform(){
                var output = document.getElementById ("outputPlatform");
                const { platform } = navigator
                output.innerHTML = "Platform: " + platform
            };

            function getMotionReduced(){
                var output = document.getElementById ("outputMotionR");
                if (matchMedia(`(prefers-reduced-motion: reduce`).matches){
                    output.innerHTML = "Motion Reduce: True";
                }
                else if (matchMedia(`(prefers-reduced-motion: no-preference`).matches){
                    output.innerHTML = "Motion Reduce: False";
                }
                else{
                    output.innerHTML = "Motion Reduce: Undefined"
                }
            };

            function GetSessionStorage(){
                var output = document.getElementById ("outputSessionS");
                try {
                    output.innerHTML = "Session storage: " + !!window.sessionStorage
                } catch (e) {
                    /* SecurityError when referencing it means it exists */
                    output.innerHTML = "Session Storage: True";
                }
            };

            function getVendor(){
                var output = document.getElementById ("outputVendor");
                output.innerHTML = "Vendor: " + navigator.vendor;
            };
