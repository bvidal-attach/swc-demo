if (typeof window.attach != 'undefined') {
  (function abTestModalLogin() {
    var atm = window.attach;
    var me = {
      debug: atm.debug || true,
      name: 'AB Test - Modal Login',
      data: {
        url: 'https://' + location.hostname + '/login',
        storage: {
          keyDay: 'checkout-modal-date',
        },
      },
      fn: {
        getCurrentDay: function () {
          return new Date().toISOString().substr(0, 10);
        },
      },
      listeners: {
        onCloseButtonClick: function () {
          document.documentElement.removeAttribute('data-show-modal');
        },
        _onAnyClick: function () {
          var tabs = document.querySelectorAll('.cm-login .tab-box .col-tab');
          var loginAccount = tabs[0];
          var boxTabRegister = tabs[1];

          loginAccount.classList.add('active');
          boxTabRegister.classList.remove('active');
        },
        _onFormClick: function (sel) {
          var iframeEl = document.querySelector('.cm-box iframe');
          var iframeDocument = iframeEl.contentDocument;
          var link = iframeDocument.querySelector(sel);
          link && link.click();
        },
        registerClick: function () {
          me.listeners._onAnyClick();
          me.listeners._onFormClick('#gigya-login-form .under-site-login label a');
        },
        loginClick: function () {
          me.listeners._onAnyClick();
          me.listeners._onFormClick('#gigya-register-form .under-site-login label a');
        },
      },
      run: function () {
        var newdateFull = me.fn.getCurrentDay();

        var dateLs = localStorage.getItem(me.data.storage.keyDay) || '';

        if (atob(dateLs) === '' || atob(dateLs) !== newdateFull) {
          var boxDataUser = document.querySelector('header nav .flex--top .nav__right .dropdown');
          if (boxDataUser) {
            document.querySelector('.cm-login').remove();
          }
          //MUESTRA MODAL
          localStorage.setItem(me.data.storage.keyDay, btoa(newdateFull));

          var id = atm.util.labelize(me.name, true).replace(/\s/g, '-');

          /* Reference element */
          document.documentElement.setAttribute('data-custom', id);

          /* Add CSS */
          var css = [
            `[data-custom=${id}] body {}`,
            `[data-custom=${id}][data-show-modal="true"] body { overflow:hidden; }`,
            `[data-custom=${id}] .cm-login { display: flex; justify-content: center; align-items: center; position: fixed; top: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; z-index:99; transition: opacity 0.2s ease, visibility 0.2s ease; }`,
            `[data-custom=${id}][data-show-modal="true"] .cm-login { opacity: 1; visibility: visible; }`,
            `[data-custom=${id}] .custom-modal-overlay { position: absolute; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); }`,
            `[data-custom=${id}] .cm-box { background-color:transparent;position: relative; width: 100%; max-width: 320px; height: 527px; border-radius: 10px; z-index: 100;}`,
            `[data-custom=${id}] .cm-box .tab-box{ display:flex; justify-content:center}`,
            `[data-custom=${id}] .cm-box .tab-box .col-tab{ width: 48%; background-color: #F2F2F2;border-radius: 28px 28px 0px 0px;}`,
            `[data-custom=${id}] .cm-box .tab-box .col-tab.active{ width: 48%; background-color: #fff;border-radius: 28px 28px 0px 0px;pointer-events: none;cursor: default;}`,
            `[data-custom=${id}] .cm-box .tab-box .col-tab.active a{ color: #008A1E;font-weight: 500}`,
            `[data-custom=${id}] .cm-box .tab-box .col-tab a{ font-size: 15px; font-weight: 500; color: #797F82;text-align:center; display:block;text-decoration:none; padding: 10px 0;}`,
            `[data-custom=${id}] .cm-box .iframeWrapper { width: 100%; height: 100%;border-radius: 10px; background: #fff;}`,
            `[data-custom=${id}] .cm-box iframe { opacity:0;width: 100%; height: 100%; border:0; border-radius: 10px; }`,
            `[data-custom=${id}] .cm-box iframe[data-ready="true"]{ opacity: 1; box-shadow: 0px 0px 0px rgb(0 0 0 / 22%), 0px 24px 24px rgb(0 0 0 / 30%); }`,
            `[data-custom=${id}] .custom-modal-close { position: absolute; right: 0; top: -40px; font-weight: 300; width: 35px; height: 35px; display: flex; justify-content: center; align-items: center; font-size: 22px; line-height: 1; cursor: pointer; background-color: #F3F3F3; color: #008A1E; border-radius: 50%; padding: 0; border: 0; }`,
            `@media screen and (min-width:1024px){`,
            `[data-custom=${id}] .cm-box { max-width: 570px; }`,
            `[data-custom=${id}] .cm-box .tab-box .col-tab a{ font-size: 18px; font-weight: 500; color: #797F82;text-align:center; display:block;text-decoration:none;display: flex;align-items: center;justify-content: center;}`,
            `}`,
          ].join('');
          atm.util.appendCSS(css);

          /* Add Modal HTML */
          var html = [
            `<div class="cm-login">`,
            `<div class="custom-modal-overlay"></div>`,
            `<div class="cm-box">`,
            `<button class="custom-modal-close">&#10006;</button>`,
            `<div class="tab-box">`,
            `<div class="col-tab active">`,
            `<a class="gigya-register-here-link loginClick" data-switch-screen="gigya-register-screen" data-screenset-element-id="__gig_template_element_13_1629995418536" data-screenset-element-id-publish="false" data-screenset-roles="instance,template,instance" href="javascript:void(0)"> Ingresa a tu cuenta </a>`,
            `</div>`,
            `<div class="col-tab">`,
            `<a class="gigya-register-here-link registerClick" data-switch-screen="gigya-register-screen" data-screenset-element-id="__gig_template_element_13_1629995418536" data-screenset-element-id-publish="false" data-screenset-roles="instance,template,instance"  href="javascript:void(0)"> Regístrate </a>`,
            `</div>`,
            `</div>`,
            `<div class="iframeWrapper">`,
            `<iframe src=${me.data.url}></iframe>`,
            `</div>`,
            `</div>`,
            `</div>`,
          ];

          document.body.insertAdjacentHTML('afterbegin', html);
          var linkRegister = document.querySelector('.tab-box .col-tab .registerClick');
          if (linkRegister) {
            linkRegister.addEventListener('click', me.listeners.registerClick);
          }

          var loginUser = document.querySelector('.tab-box .col-tab .loginClick');
          if (loginUser) {
            loginUser.addEventListener('click', me.listeners.loginClick);
          }

          /* Get Modal */
          var modalEl = document.querySelector('[data-custom="' + id + '"]');
          if (modalEl) {
            /* Button Close */
            var buttonCloseEl = modalEl.querySelector('button.custom-modal-close');
            if (buttonCloseEl) {
              buttonCloseEl.removeEventListener('click', me.listeners.onCloseButtonClick);
              buttonCloseEl.addEventListener('click', me.listeners.onCloseButtonClick);
            }
          }

          /* Get Iframe */
          var iframeEl = modalEl.querySelector('.cm-box iframe');

          if (iframeEl) {
            iframeEl.addEventListener('load', function (evt) {
              var iframeDocument = evt.target.contentDocument;
              var iframeWindow = evt.target.contentWindow;
              var iframeAttach = iframeWindow.attach;

              evt.target.contentWindow.addEventListener('beforeunload', function (evt2) {
                if (window.gigya && window.gigya.accounts && typeof window.gigya.accounts.getAccountInfo === 'function') {
                  console.log(evt2.target);
                  iframeEl.removeAttribute('data-ready');
                  window.gigya.accounts.getAccountInfo({
                    callback: function (response) {
                      if (response.errorCode == 0) {
                        window.top.location.reload();
                      }
                    },
                  });
                }
              });

              if (typeof iframeAttach != 'undefined') {
                /* Reference element */
                iframeDocument.documentElement.setAttribute('data-custom', id);

                /* Add CSS */
                var iframeCss = [
                  `[data-custom=${id}] { width: 100%; height: 100%;}`,
                  `[data-custom=${id}] body { width: 100%; height: 100%; padding-top: 0px; display: flex; align-items: flex-start; justify-content:center; }`,
                  `[data-custom=${id}] main { width: 100%; }`,

                  `[data-custom=${id}] body > *:not(main),`,
                  `[data-custom=${id}] main > *:not(.main__inner-wrapper),`,
                  `[data-custom=${id}] .main__inner-wrapper > *:not(.account-section),`,
                  `[data-custom=${id}] .account-section > .account-section-content > *:not(#login-container),`,
                  `[data-custom=${id}] #gigya-login-screen .gigya-layout-cell.with-divider,`,
                  `[data-custom=${id}] #gigya-register-screen .gigya-layout-cell.with-divider { display: none !important; }`,

                  `[data-custom=${id}] #gigya-login-screen,`,
                  `[data-custom=${id}] #gigya-register-screen { width: 100%; padding: 42px 50px; }`,

                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login {  }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login:before { display: block; font-size: 16px; line-height: 24px; margin: 16px 0; color: #4e515e; letter-spacing: 0.01em; }`,
                  `[data-custom=${id}] #gigya-login-form .gigya-layout-row .with-social-login .gigya-composite-control-image {display: none;}`,
                  `[data-custom=${id}] .gigya-screen.portrait .gigya-composite-control.gigya-composite-control-social-login {right: 15px;}`,
                  `[data-custom=${id}] #login-container_social_0 { max-width: 100% !important; height: auto !important}`,
                  `[data-custom=${id}] #login-container_social_0 #login-container_social_0_uiContainer{ height:auto !important;}`,

                  `[data-custom=${id}] #login-container_social_0 .gigya-login-providers .gigya-login-providers-container{ width: 100% !important}`,
                  `[data-custom=${id}] #login-container_social_0 .gigya-login-providers .gigya-login-providers-container tr .gigya-login-providers-list-container .gigya-active .gigya-login-providers-list { display:flex; flex-flow: row wrap;justify-content: center}`,

                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login:before { content: "ó"; }`,
                  `[data-custom=${id}] #register-social-login .gigya-layout-row .gigya-composite-control-image { display:none}`,
                  `[data-custom=${id}] #login-container_social_1 { max-width:100% !important; height: auto !important}`,
                  `[data-custom=${id}] #login-container_social_1 #login-container_social_1_uiContainer{ height:auto !important}`,
                  `[data-custom=${id}] #login-container_social_1 .gigya-login-providers .gigya-login-providers-container{ width: 100% !important}`,
                  `[data-custom=${id}] #login-container_social_1 .gigya-login-providers .gigya-login-providers-container tr .gigya-login-providers-list-container .gigya-active .gigya-login-providers-list { display:flex; flex-flow: row wrap;justify-content: center}`,

                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login:before { content: "ó"; }`,

                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-composite-control-header,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login .gigya-composite-control-header { font-size: 0; line-height: 0; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-composite-control-header *,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login .gigya-composite-control-header * { display: none !important; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-composite-control-header:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login .gigya-composite-control-header:before { display: block; font-size: 16px; line-height: 20px; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-composite-control-header:before { content: "Inicia sesión con tu correo electrónico y contraseña"; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login .gigya-composite-control-header:before { content: "Regístrate con tu correo electrónico y contraseña"; }`,

                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-composite-control-textbox:before,`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-composite-control-password:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > h2 + .gigya-layout-row > .gigya-composite-control-textbox:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > h2 + .gigya-layout-row + .gigya-composite-control-textbox:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > h2 + .gigya-layout-row + .gigya-composite-control-textbox + .gigya-composite-control-textbox:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > .gigya-composite-control-multi-choice .gigya-label,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .with-two-inputs#password-row:before { display: block; display: block; font-size: 15px; line-height: 20px; font-weight: 600; letter-spacing: 0.03em; margin-bottom: 5px; text-align: left; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > .gigya-composite-control-multi-choice .gigya-label .gigya-required-display { display: none !important; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > .gigya-composite-control-multi-choice .gigya-label .gigya-label-text { font-family: inherit !important; font-weight: inherit !important; margin: 0 !important; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > .gigya-composite-control-multi-choice .gigya-multi-choice-item .gigya-input-radio { margin-bottom: 6px; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-composite-control-textbox:before { content: "Correo"; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-composite-control-password:before { content: "Contraseña"; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > h2 + .gigya-layout-row > .gigya-composite-control-textbox:before { content: "Correo"; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > h2 + .gigya-layout-row + .gigya-composite-control-textbox:before { content: "Nombres"; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > h2 + .gigya-layout-row + .gigya-composite-control-textbox + .gigya-composite-control-textbox:before { content: "Apellidos"; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .with-two-inputs#password-row:before { content: "Contraseña"; }`,

                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-forgotPassword { font-size: 0; line-height: 0; color: #24282D; text-decoration: none !important; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-forgotPassword:before { content: "¿Olvidaste tu contraseña?"; display: block; font-size: 14px; line-height: 20px; color: inherit; border-bottom: 1px solid transparent; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login .gigya-forgotPassword:hover:before { border-bottom: 1px solid #24282D; }`,

                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-input-submit,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-input-submit { font-size: 15px; line-height: 1; height: 40px; border-radius: 20px; padding: 0 30px; letter-spacing: 0.02em; box-shadow: none !important; }`,

                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label { font-size: 0; line-height: 0; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label:before { display: block; font-size: 15px; line-height: 18px; margin-bottom: 5px; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label:before { content: "¿Aún no tienes un código de cliente?"; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label:before { content: "¿Ya tienes una cuenta?"; }`,

                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label a,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label a { font-size: 0; line-height: 0; color: #008A1E; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label a:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label a:before { display: inline-block; font-size: 15px; line-height: 20px; border-bottom: 1px solid transparent; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label a:hover:before,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label a:hover:before { border-bottom: 1px solid #008A1E; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label a:before { content: "Regístrate"; }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.under-site-login .gigya-composite-control-label a:before { content: "Inicia sesión"; }`,
                  `[data-custom=${id}] #gigya-reset-password-form > div.gigya-layout-row.submit-row > div.gigya-composite-control.gigya-composite-control-submit > input { background-color: #008A1E;font-size: 15px;line-height: 1;height: 40px;border-radius: 8px;padding: 0 30px;letter-spacing: 0.02em;box-shadow: none !important; }`,
                  `@media screen and (max-width:500px){`,
                  `[data-custom=${id}] #register-social-login div:nth-child(1) {margin:0 !important;}`,
                  `}`,

                  `@media screen and (max-width:320px){`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login,`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login { padding-left: 0;padding-right: 0; }`,
                  `[data-custom=${id}] #login-container #gigya-login-screen .gigya-layout-cell.with-site-login > .gigya-layout-row , `,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row{ margin: auto 0 }`,
                  `[data-custom=${id}] #login-container #gigya-register-screen .gigya-layout-cell.with-site-login > .gigya-layout-row > h2 + .gigya-layout-row {margin: auto 0}`,
                  `[data-custom=${id}] #gigya-reset-password-form > label {padding: 0 45px}`,
                  `[data-custom=${id}] #gigya-reset-password-form > div.gigya-layout-row.submit-row > div.gigya-composite-control.gigya-composite-control-submit > input{padding: 0 25px;font-size: 15px;background-color: #008A1E;border-radius: 8px;padding: 0 30px;}`,
                  `[data-custom=${id}] #gigya-login-form .gigya-layout-row .with-social-login .gigya-composite-control-social-login,  #register-social-login .gigya-layout-row .gigya-composite-control-social-login .gigya-social-login{height: 90px;display: flex;align-items: center;}`,
                  '}',
                ].join('');

                iframeAttach.util.appendCSS(iframeCss);
                /* Transform HTML */
                iframeWindow.onLoginAndRegisterScreenSwitches = function () {
                  iframeAttach.util.seekFor('#gigya-login-form .under-site-login label a', { tries: 50, delay: 500 }, function (linkRegisterEls) {
                    var linkRegisterEl = linkRegisterEls[0];
                    linkRegisterEl.addEventListener('click', me.listeners._onAnyClick);
                  });

                  iframeAttach.util.seekFor('#gigya-register-form .under-site-login label a', { tries: 50, delay: 500 }, function (linkLoginEls) {
                    var linkLoginEl = linkLoginEls[0];
                    linkLoginEl.addEventListener('click', me.listeners._onAnyClick);
                  });

                  iframeAttach.util.seekFor(
                    '#login-container form[data-screenset-element-id]:not([data-found="true"])',
                    { tries: 50, delay: 500 },
                    function (formsEls) {
                      var formEl = formsEls[0];
                      formEl.setAttribute('data-found', 'true');

                      if (formEl.matches('[data-screenset-element-id="gigya-login-form"]')) {
                        var inputsEls = formEl.querySelectorAll('.gigya-composite-control input');
                        if (inputsEls.length > 0) {
                          for (var i = 0; i < inputsEls.length; i++) {
                            var inputEl = inputsEls[i];
                            if (inputEl.matches('[name="username"]')) {
                              inputEl.setAttribute('placeholder', 'Ingresa tu correo aquí');
                            } else if (inputEl.matches('[name="password"]')) {
                              inputEl.setAttribute('placeholder', 'Ingresa tu contraseña aquí');
                            }
                          }
                        }
                      } else if (formEl.matches('[data-screenset-element-id="gigya-register-form"]')) {
                        var inputsEls = formEl.querySelectorAll('.gigya-composite-control input');
                        if (inputsEls.length > 0) {
                          for (var i = 0; i < inputsEls.length; i++) {
                            var inputEl = inputsEls[i];
                            if (inputEl.matches('[name="email"]')) {
                              inputEl.setAttribute('placeholder', 'Ingresa tu correo aquí');
                            } else if (inputEl.matches('[name="profile.firstName"]')) {
                              inputEl.setAttribute('placeholder', 'Ingresa tu nombre aquí');
                            } else if (inputEl.matches('[name="profile.lastName"]')) {
                              inputEl.setAttribute('placeholder', 'Ingresa tus apellidos aquí');
                            } else if (inputEl.matches('[name="passwordRetype"]')) {
                              inputEl.setAttribute('placeholder', 'Repite contraseña');
                            }
                          }
                        }
                      }

                      var screenSwitchersEls = formEl.querySelectorAll('a[data-switch-screen]');
                      if (screenSwitchersEls.length > 0) {
                        for (var i = 0; i < screenSwitchersEls.length; i++) {
                          var screenSwitcherEl = screenSwitchersEls[i];

                          screenSwitcherEl.removeEventListener('click', iframeWindow.onLoginAndRegisterScreenSwitches);
                          screenSwitcherEl.addEventListener('click', iframeWindow.onLoginAndRegisterScreenSwitches);
                        }
                      }
                    }
                  );
                };

                iframeWindow.onLoginAndRegisterScreenSwitches();

                evt.target.setAttribute('data-ready', 'true');
                /* Show modal */
                document.documentElement.setAttribute('data-show-modal', 'true');
              }
            });
          }
        }
      },
    };
    return me;
  })().run();
}
