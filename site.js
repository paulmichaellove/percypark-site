/*
  Percy Park RFC demonstration site. One small local script, no libraries.
  - Every form marked data-demo-form is STATIC for the demo: on submit it shows a thank you
    message in place of the form and sends nothing anywhere.
  - Links marked data-enquiry preselect the event type in the showaround form.
  The live forms will post to the club's chosen address (see the comment above each form).
*/
(function () {
  var forms = document.querySelectorAll('form[data-demo-form]');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var nameEl = form.querySelector('[name=name]');
      var first = nameEl ? nameEl.value.trim().split(/\s+/)[0] : '';
      var msg = form.getAttribute('data-thanks') || 'We have your details and will be in touch.';
      var box = document.createElement('div');
      box.className = 'thanks';
      box.setAttribute('role', 'status');
      box.tabIndex = -1;
      box.innerHTML = '<svg aria-hidden="true"><use href="#i-check"/></svg><h3></h3><p></p><p class="fine"></p>';
      box.querySelector('h3').textContent = first ? 'Thank you, ' + first : 'Thank you';
      box.querySelectorAll('p')[0].textContent = msg;
      box.querySelectorAll('p')[1].textContent = 'Demonstration only. Nothing has been sent.';
      form.replaceWith(box);
      box.focus();
    });
  });

  var links = document.querySelectorAll('[data-enquiry]');
  Array.prototype.forEach.call(links, function (a) {
    a.addEventListener('click', function () {
      var sel = document.getElementById('f-type');
      if (sel) { sel.value = a.getAttribute('data-enquiry'); }
    });
  });
})();
