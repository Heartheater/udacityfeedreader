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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
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
    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('has at least a single entry', function () {
            let allEntries = document.getElementsByClassName('entry-link');
            expect(allEntries.length).not.toBe(0);
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        let feedTitles,
            previousFeeds = [],
            newFeeds = [];

        //load first feed
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
            feedTitles = document.querySelectorAll('.entry');
            feedTitles.forEach(function (entry) {
                previousFeeds.push(entry.innerText);
            });
        });

        //load second feed
        beforeEach(function (done) {
            loadFeed(1, function () {
                done();
            });
        });

        //check if feeds are different
        it('loads new feeds', function () {
            feedTitles = document.querySelectorAll('.entry');
            feedTitles.forEach(function (entry) {
                newFeeds.push(entry.innerText);
            });
            for (let index = 0; index < newFeeds.length; ++index) {
                expect(previousFeeds[index]).not.toBe(newFeeds[index]);
            }
        });
    });
}());
