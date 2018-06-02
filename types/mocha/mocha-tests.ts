import {
    after as importedAfter,
    before as importedBefore,
    afterEach as importedAfterEach,
    beforeEach as importedBeforeEach,
    context as importedContext,
    describe as importedDescribe,
    it as importedIt,
    xdescribe as importedXdescribe,
    xit as importedXit
} from 'mocha';

import LocalMocha = require('mocha');

// Warning!!
// Don't refer node.d.ts!!
// See #22510.
(): number => setTimeout(() => 0, 0);

declare let number: number;
declare let boolean: boolean;
declare let string: string;
declare let stringOrUndefined: string | undefined;
declare let any: any;

// Use module augmentation to add a third-party interface or reporter
declare module 'mocha' {
    interface InterfaceContributions {
        'third-party-interface': never;
    }
    interface ReporterContributions {
        'third-party-reporter': never;
    }
}

const thirdPartyInterface: Mocha.Interface = 'third-party-interface';
const thirdPartyReporter: Mocha.Reporter = 'third-party-reporter';

// Lazy tests of compatibility between imported and global functions; should be identical
const _after: typeof after = importedAfter;
const _after2: typeof importedAfter = after;
const _before: typeof before = importedBefore;
const _before2: typeof importedBefore = before;
const _afterEach: typeof afterEach = importedAfterEach;
const _afterEach2: typeof importedAfterEach = afterEach;
const _beforeEach: typeof beforeEach = importedBeforeEach;
const _beforeEach2: typeof importedBeforeEach = beforeEach;
const _context: typeof context = importedContext;
const _context2: typeof importedContext = context;
const _describe: typeof describe = importedDescribe;
const _describe2: typeof importedDescribe = describe;
const _it: typeof it = importedIt;
const _it2: typeof importedIt = it;
const _xdescribe: typeof xdescribe = importedXdescribe;
const _xdescribe2: typeof importedXdescribe = xdescribe;
const _xit: typeof xit = importedXit;
const _xit2: typeof importedXit = xit;

function test_bdd_describe() {
    // $ExpectType Suite
    describe('something', function(done) {
        // $ExpectType Context
        this;

        // $ExpectType Done
        done;
    });

    // $ExpectType Suite
    describe('something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Suite
    describe.only('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Suite
    describe.only('something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType void | Suite
    describe.skip('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType void | Suite
    describe.skip('something', async function() {
        // $ExpectType Context
        this;
    });
}

function test_bdd_context() {
    // $ExpectType Suite
    context('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Suite
    context('something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Suite
    context.only('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Suite
    context.only('something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType void | Suite
    context.skip('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType void | Suite
    context.skip('something', async function() {
        // $ExpectType Context
        this;
    });
}

function test_bdd_xdescribe() {
    // $ExpectType void | Suite
    xdescribe('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType void | Suite
    xdescribe('something', async function() {
        // $ExpectType Context
        this;
    });
}

function test_bdd_xcontext() {
    // $ExpectType void | Suite
    xcontext('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType void | Suite
    xcontext('something', async function() {
        // $ExpectType Context
        this;
    });
}

function test_tdd_suite() {
    // $ExpectType Suite
    suite('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Suite
    suite('something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Suite
    suite.only('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Suite
    suite.only('something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType void | Suite
    suite.skip('something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType void | Suite
    suite.skip('something', async function() {
        // $ExpectType Context
        this;
    });
}

function test_qunit_suite() {
    // $ExpectType Suite
    suite('some context');

    // $ExpectType Suite
    suite.only('some context');
}

function test_bdd_it() {
    // $ExpectType Test
    it(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it.only(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it.only(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it.only('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it.only('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it.skip(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it.skip(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it.skip('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    it.skip('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType void
    it.retries(number);
}

function test_bdd_xit() {
    // $ExpectType Test
    xit(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    xit(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    xit('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    xit('does something', async function() {
        // $ExpectType Context
        this;
    });
}

function test_bdd_specify() {
    // $ExpectType Test
    specify(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify.only(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify.only(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify.only('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify.only('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify.skip(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify.skip(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify.skip('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    specify.skip('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType void
    specify.retries(number);
}

function test_bdd_xspecify() {
    // $ExpectType Test
    xspecify(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    xspecify(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    xspecify('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    xspecify('does something', async function() {
        // $ExpectType Context
        this;
    });
}

function test_tdd_qunit_test() {
    // $ExpectType Test
    test(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test.only(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test.only(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test.only('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test.only('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test.skip(function doesSomething(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test.skip(async function doesSomething() {
        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test.skip('does something', function(done) {
        // $ExpectType Done
        done;

        // $ExpectType Context
        this;
    });

    // $ExpectType Test
    test.skip('does something', async function() {
        // $ExpectType Context
        this;
    });

    // $ExpectType void
    test.retries(number);
}

function test_bdd_qunit_before() {
    before(function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    before(async function() {
        // $ExpectType Context
        this;
    });

    before('description', function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    before('description', async function() {
        // $ExpectType Context
        this;
    });
}

function test_tdd_setup() {
    setup(function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    setup(async function() {
        // $ExpectType Context
        this;
    });

    setup('description', function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    setup('description', async function() {
        // $ExpectType Context
        this;
    });
}

function test_bdd_qunit_after() {
    after(function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    after(async function() {
        // $ExpectType Context
        this;
    });

    after('description', function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    after('description', async function() {
        // $ExpectType Context
        this;
    });
}

function test_tdd_teardown() {
    teardown(function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    teardown(async function() {
        // $ExpectType Context
        this;
    });

    teardown('description', function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    teardown('description', async function() {
        // $ExpectType Context
        this;
    });
}

function test_bdd_qunit_beforeEach() {
    beforeEach(function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    beforeEach(async function() {
        // $ExpectType Context
        this;
    });

    beforeEach('description', function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    beforeEach('description', async function() {
        // $ExpectType Context
        this;
    });
}

function test_tdd_suiteSetup() {
    suiteSetup(function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    suiteSetup(async function() {
        // $ExpectType Context
        this;
    });

    suiteSetup('description', function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    suiteSetup('description', async function() {
        // $ExpectType Context
        this;
    });
}

function test_bdd_qunit_afterEach() {
    afterEach(function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    afterEach(async function() {
        // $ExpectType Context
        this;
    });

    afterEach('description', function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    afterEach('description', async function() {
        // $ExpectType Context
        this;
    });
}

function test_tdd_suiteTeardown() {
    suiteTeardown(function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    suiteTeardown(async function() {
        // $ExpectType Context
        this;
    });

    suiteTeardown('description', function(done) {
        // $ExpectType Done
        done;
        // $ExpectType Context
        this;
    });

    suiteTeardown('description', async function() {
        // $ExpectType Context
        this;
    });
}

function test_Context(ctx: LocalMocha.Context, runnable: LocalMocha.Runnable) {
    // $ExpectType never
    ctx.skip(); // throws

    // $ExpectType boolean
    ctx.enableTimeouts();

    // $ExpectType Context
    ctx.enableTimeouts(boolean);

    // $ExpectType number
    ctx.retries();

    // $ExpectType Context
    ctx.retries(number);

    // $ExpectType Runnable
    ctx.runnable();

    // $ExpectType Context
    ctx.runnable(runnable);

    // $ExpectType number
    ctx.slow();

    // $ExpectType Context
    ctx.slow(number);

    // $ExpectType number
    ctx.timeout();

    // $ExpectType Context
    ctx.timeout(number);

    // $ExpectType Test
    ctx.currentTest;

    ctx["extended"] = any;

    // $ExpectType any
    ctx["extended"];

    ctx.enableTimeouts(boolean)
        .retries(number)
        .runnable(runnable)
        .slow(number)
        .timeout(number)
        .skip();
}

function test_reporter_string(localMocha: LocalMocha) {
    // $ExpectType BrowserMocha
    mocha.reporter('html');

    // $ExpectType Mocha
    localMocha.reporter('html');
}

function test_reporter_function(localMocha: LocalMocha) {
    // $ExpectType BrowserMocha
    mocha.reporter(class extends LocalMocha.reporters.Base { });

    // $ExpectType Mocha
    localMocha.reporter(class extends LocalMocha.reporters.Base { });
}

function test_browser_mocha_setup_slow_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ slow: 25 });
}

function test_browser_mocha_setup_timeout_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ timeout: 25 });
}

function test_browser_mocha_setup_globals_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ globals: ['mocha'] });
}

function test_browser_mocha_setup_ui_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ ui: 'bdd' });
}

function test_browser_mocha_setup_reporter_string_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ reporter: 'html' });
}

function test_browser_mocha_setup_require_stringArray_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ require: ['ts-node/register'] });
}

function test_browser_mocha_setup_reporter_function_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ reporter: class extends LocalMocha.reporters.Base { } });
}

function test_browser_mocha_setup_bail_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ bail: false });
}

function test_browser_mocha_setup_ignore_leaks_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ ignoreLeaks: false });
}

function test_browser_mocha_setup_grep_string_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ grep: "describe" });
}

function test_browser_mocha_setup_grep_regex_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ grep: new RegExp('describe') });
}

function test_browser_mocha_setup_grep_regex_literal_option() {
    // $ExpectType BrowserMocha
    mocha.setup({ grep: /(expect|should)/i });
}

function test_browser_mocha_setup_all_options() {
    // $ExpectType BrowserMocha
    mocha.setup({
        slow: 25,
        timeout: 25,
        ui: 'bdd',
        globals: ['mocha'],
        reporter: 'html',
        bail: true,
        ignoreLeaks: true,
        grep: 'test',
        require: ['ts-node/register'] // TODO: It doesn't appear this is actually supported. Should it be removed?
    });
}

function test_constructor_slow_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ slow: 25 });
}

function test_constructor_timeout_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ timeout: 25 });
}

function test_constructor_globals_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ globals: ['mocha'] });
}

function test_constructor_ui_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ ui: 'bdd' });
}

function test_constructor_reporter_string_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ reporter: 'html' });
}

function test_constructor_reporter_function_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ reporter: class extends LocalMocha.reporters.Base { } });
}

function test_constructor_bail_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ bail: false });
}

function test_constructor_ignore_leaks_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ ignoreLeaks: false });
}

function test_constructor_grep_string_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ grep: "describe" });
}

function test_constructor_grep_regex_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ grep: new RegExp('describe') });
}

function test_constructor_grep_regex_literal_option() {
    // $ExpectType BrowserMocha
    new LocalMocha({ grep: /(expect|should)/i });
}

function test_constructor_all_options() {
    // $ExpectType BrowserMocha
    new LocalMocha({
        slow: 25,
        timeout: 25,
        ui: 'bdd',
        globals: ['mocha'],
        reporter: 'html',
        bail: true,
        ignoreLeaks: true,
        grep: 'test'
    });
}

function test_run(localMocha: LocalMocha) {
    // $ExpectType Runner
    mocha.run();

    // $ExpectType Runner
    mocha.run((failures) => {
        // $ExpectType number
        failures;
    });

    // $ExpectType Runner
    localMocha.run();

    // $ExpectType Runner
    localMocha.run((failures) => {
        // $ExpectType number
        failures;
    });
}

function test_growl() {
    mocha.growl();
}

function test_chaining() {
    new LocalMocha({ slow: 25 })
        .growl()
        .reporter('html')
        .reporter(class extends LocalMocha.reporters.Base { });
}

function test_require_constructor_empty() {
    const instance = new LocalMocha();
}

function test_require_constructor_noOptions() {
    const instance = new LocalMocha({});
}

function test_require_constructor_allOptions() {
    const instance = new LocalMocha({
        grep: /[a-z]*/,
        ui: 'tdd',
        reporter: 'dot',
        timeout: 500,
        bail: true
    });
}

function test_require_fluentParams() {
    const instance = new LocalMocha();

    instance.bail(true)
        .bail()
        .addFile('foo.js')
        .reporter('dot')
        .ui('bdd')
        .grep('[a-z]*')
        .grep(/[a-z]*/)
        .invert()
        .ignoreLeaks(true)
        .checkLeaks()
        .growl()
        .globals('foo')
        .globals(['bar', 'zap'])
        .useColors(true)
        .useInlineDiffs(true)
        .timeout(500)
        .slow(100)
        .enableTimeouts(true)
        .asyncOnly()
        .noHighlighting()
        .run();
}

function test_throwError() {
    mocha.throwError(new Error("I'm an error!"));
}

function test_mochaRunner_properties(runner: LocalMocha.Runner, suite: LocalMocha.Suite) {
    // $Expecttype Runner
    runner.abort();

    // $ExpectType Suite
    runner.suite;

    // $ExpectType boolean
    runner.started;

    // $ExpectType number
    runner.total;

    // $ExpectType number
    runner.failures;

    // $ExpectType Runner
    runner.grep(/regex/, false);

    // $ExpectType number
    runner.grepTotal(suite);

    // $ExpectType string[]
    runner.globals();

    // $ExpectType Runner
    runner.globals(["hello", "world"]);

    // $ExpectType Runner
    runner.run();

    // $ExpectType Runner
    runner.run((failures) => {
        // $ExpectType number
        failures;
    });
}

function test_base_reporter_properties(reporter: LocalMocha.reporters.Base) {
    // $ExpectType number
    reporter.stats.failures;

    // $ExpectType number
    reporter.stats.passes;

    // $ExpectType number
    reporter.stats.pending;

    // $ExpectType number
    reporter.stats.suites;

    // $ExpectType number
    reporter.stats.tests;

    // $ExpectType Date | undefined
    reporter.stats.start;

    // $ExpectType Date | undefined
    reporter.stats.end;

    // $ExpectType number | undefined
    reporter.stats.duration;
}

function test_runner_events(runner: LocalMocha.Runner) {
    // $ExpectType Runner
    runner.on("start", () => {});

    // $ExpectType Runner
    runner.on("end", () => {});

    // $ExpectType Runner
    runner.on("suite", (suite) => {
        // $ExpectType Suite
        suite;
    });

    // $ExpectType Runner
    runner.on("suite end", (suite) => {
        // $ExpectType Suite
        suite;
    });

    // $ExpectType Runner
    runner.on("test", (test) => {
        // $ExpectType Test
        test;
    });

    // $ExpectType Runner
    runner.on("test end", (test) => {
        // $ExpectType Test
        test;
    });

    // $ExpectType Runner
    runner.on("hook", (hook) => {
        // $ExpectType Hook
        hook;
    });

    // $ExpectType Runner
    runner.on("hook end", (hook) => {
        // $ExpectType Hook
        hook;
    });

    // $ExpectType Runner
    runner.on("pass", (test) => {
        // $ExpectType Test
        test;
    });

    // $ExpectType Runner
    runner.on("fail", (test, err) => {
        // $ExpectType Test
        test;

        // $ExpectType any
        err;
    });

    // $ExpectType Runner
    runner.on("pending", (test) => {
        // $ExpectType Test
        test;
    });
}

function test_runnable_events(runnable: LocalMocha.Runnable) {
    // $ExpectType Runnable
    runnable.on("error", (error) => {
        // $ExpectType any
        error;
    });
}

function test_suite_events(suite: LocalMocha.Suite) {
    // $ExpectType Suite
    suite.on("beforeAll", (hook) => {
        // $ExpectType Hook
        hook;
    });

    // $ExpectType Suite
    suite.on("afterAll", (hook) => {
        // $ExpectType Hook
        hook;
    });

    // $ExpectType Suite
    suite.on("beforeEach", (hook) => {
        // $ExpectType Hook
        hook;
    });

    // $ExpectType Suite
    suite.on("afterEach", (hook) => {
        // $ExpectType Hook
        hook;
    });

    // $ExpectType Suite
    suite.on("run", () => { });

    // $ExpectType Suite
    suite.on("pre-require", (context) => {
        // $ExpectType Context
        context;
    });
}
