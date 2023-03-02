import { Operator, Hypercast } from 'hypercast/client';

const operator = new Operator<{
  message: string
}>();

function truncate(value: string) {
  return value.slice(0, 4) + '...' + value.slice(-8);
}

function timestamp() {
  return new Date().toISOString().split('T')[1].slice(0, 8);
}

;(async () => {
  const status = document.getElementById('status');
  const form = document.getElementById('form');
  const messages = document.getElementById('messages');

  if (!status || !form || !messages) {
    return
  }

  const { topic } = await operator.createTopic('hypercast-demo');
  const hypercast = new Hypercast<{ message: string }>(topic);

  // @ts-ignore
  window.hypercast = hypercast;

  hypercast.on('connect', e => {
    status.innerHTML = `Status: Connected @ ${truncate(e.data.clientId)}`;
  })

  hypercast.on('message', e => {
    messages.innerHTML = `
      <div class='pb2 mono f aic jcb'>
        <span class='blue'>${e.data.message}</span>
        <span class='gray'>${timestamp()}</span>
      </div>
    ` + messages.innerHTML;
  })

  await hypercast.connect();

  form.onsubmit = async e => {
    e.preventDefault();

    // @ts-ignore
    const message = e.target.elements?.message.value;

    if (!message) return

    await hypercast.send({ message });

    // @ts-ignore
    e.target.reset()
  }
})();
