<template>
  <div>
    <header>
      <img id="logo" src="/logo.svg" alt="gotiny.cc" />
      <h1>the most lightweight link shortener API</h1>
    </header>
    <GoTinyApp />
    <main>
      <section id="features">
        <div id="fast" class="feature-block">
          <div class="feature-img">
            <img src="/icn_fast.svg" alt="fast" />
          </div>
          <h2>Fast</h2>
          <p>
            GoTiny is stripped down to just the bare minimals for
            <span>extremely fast performance</span>. With an average processing
            time of just ~34ms, nothing comes between you and long URLs.
          </p>
        </div>
        <div id="secure" class="feature-block">
          <div class="feature-img">
            <img src="/icn_secure.svg" alt="secure" />
          </div>
          <h2>Secure</h2>
          <p>
            Privacy is important. GoTiny does not handle, collect or store
            <span>any user information</span>. In fact, did you notice the
            cookie compliance pop-up when visiting this page? Yeah, neither did
            we.
          </p>
        </div>
        <div id="accessible" class="feature-block">
          <div class="feature-img">
            <img src="/icn_accessible.svg" alt="accessible" />
          </div>
          <h2>Accessible</h2>
          <p>
            You get a short link! You get a short link! Everybody gets a short
            link! With our
            <a href="https://www.npmjs.com/package/gotiny" target="_blank">
              easy to use SDK
            </a>
            , you can set up GoTiny into your projects in literally seconds.
          </p>
        </div>
      </section>
      <section id="integration">
        <div id="discord">
          <img src="/integration_discord.png" alt="discord" />
          <div class="title">GoTiny<span>BOT</span></div>
          <div class="label online"><span></span>online</div>
          <a
            href="https://discord.com/api/oauth2/authorize?client_id=794998843040858122&permissions=0&scope=bot"
            role="button"
          >
            Add to Discord
          </a>
        </div>
        <div id="slack">
          <img src="/integration_slack.png" alt="slack" />
          <div class="title">GoTiny<span>BOT</span></div>
          <div class="label online"><span></span>online</div>
          <a
            href="https://slack.com/oauth/v2/authorize?client_id=1641500992789.2840015417303&scope=channels:history,chat:write,groups:history,im:history,mpim:history,commands,incoming-webhook"
            role="button"
          >
            Add to Slack
          </a>
        </div>
      </section>
    </main>
    <footer>
      <ul>
        <li>
          &copy;
          {{ new Date().getFullYear() }}
          <a href="/">gotiny.cc</a>
        </li>
        <li>
          <a href="https://github.com/robvanbakel/gotiny-api" target="_blank">
            API
          </a>
        </li>
        <li><a href="mailto:info@gotiny.cc">Contact</a></li>
      </ul>
    </footer>
  </div>
</template>
