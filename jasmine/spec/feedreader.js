/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Maps allFeeds and ensures each feed has an URL defined
        it('all feeds have URLs defined', function () {
            allFeeds.map(feed => {
                expect(Boolean(feed.url)).toBe(true);
            });
        });

        /* loops through each feed in the allFeeds object
         * and ensures it has a name defined
         */
        it('all feeds have names defined', function () {
            allFeeds.map(feed => {
                expect(Boolean(feed.name)).toBe(true);
            });
        });


    });

    
    describe('The Menu', function () {
        //checks that menu is hidden by default
        it('is hidden by default', function () {
            let menu = document.querySelector('body');
            expect(menu.classList.contains('menu-hidden')).toBe(true);
        });

        it('toggles visibility when menu icon is clicked', function () {
            let button = document.querySelector('.menu-icon-link'),
                menu = document.querySelector('body');
            button.click();
            expect(menu.classList.contains('menu-hidden')).not.toBe(true);
            button.click();
            expect(menu.classList.contains('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('has at least a single entry', function () {
            let allEntries = document.querySelectorAll('.feed .entry');
            expect(allEntries.length).not.toBe(0);
        });
    });


    describe('New Feed Selection', function () {
        let previousFeeds = [],
            newFeeds = [];

        beforeEach(function (done) {
            //get first feed
            loadFeed(1, function () {
                previousFeeds = $('.entry').html();
                //get second feed
                loadFeed(0, function () {
                    newFeeds = $('.entry').html();
                    done();
                });
            });
        });

        //check if the feeds are different
        it('loads new feeds', function () {
            expect(previousFeeds).not.toEqual(newFeeds);
        });
    });
}());
