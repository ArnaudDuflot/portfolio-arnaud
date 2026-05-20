(function () {
  var emailAddress = 'duflot.arnaud@gmail.com';

  function showCopied(toast) {
    toast.classList.add('visible');
    setTimeout(function () { toast.classList.remove('visible'); }, 2000);
  }

  function fallbackCopy(text, toast) {
    var input = document.createElement('input');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showCopied(toast);
    } catch (e) {
      console.error('Copy failed', e);
    }
    document.body.removeChild(input);
  }

  function setupCopyButton(btnId, toastId) {
    var btn = document.getElementById(btnId);
    var toast = document.getElementById(toastId);
    if (!btn || !toast) return;

    btn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailAddress).then(function () {
          showCopied(toast);
        }).catch(function () {
          fallbackCopy(emailAddress, toast);
        });
      } else {
        fallbackCopy(emailAddress, toast);
      }
    });
  }

  setupCopyButton('copyEmailBtn', 'copyToast');
  setupCopyButton('copyEmailBtnProject', 'copyToastProject');
})();
