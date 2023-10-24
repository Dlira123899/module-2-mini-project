const EmailContent = (contents = []) => {
  let html = '<html><body>';
  for (let i = 0; i < contents.length; i++) {
    html += `<p>${contents[i]}</p>`;
  }
  html += '</body></html>';

  return html;
};

module.exports = EmailContent;
