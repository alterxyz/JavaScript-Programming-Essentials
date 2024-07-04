const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 阻止表单默认提交行为

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const messageContent = `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

        alert(`Thank you for your message!\n\nPlease note that this is a demo, so no data was submitted or sent anywhere.\n\n${messageContent}`);

        // 清空表单字段
        contactForm.reset();
    });
}

