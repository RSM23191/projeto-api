const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API_PICSUM = (page = 1, limit = 12) => `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

document.addEventListener('DOMContentLoaded', () => {
  const page = document.documentElement.getAttribute('data-page');

  if (page === 'index') {
    loadPosts();
    loadImages();
  }

  if (page === 'create') {
    const form = document.getElementById('createForm');
    form.addEventListener('submit', submitCreate);
  }

  if (page === 'edit') {
    const loadBtn = document.getElementById('loadBtn');
    const delBtn = document.getElementById('deleteBtn');
    const form = document.getElementById('editForm');

    loadBtn.addEventListener('click', loadForEdit);
    form.addEventListener('submit', submitUpdate);
    delBtn.addEventListener('click', handleDelete);
  }
});

async function loadPosts() {
  const container = document.getElementById('posts');
  container.innerHTML = '<div class="card">Carregando posts...</div>';
  try {
    const res = await fetch(API_POSTS + '?_limit=9');
    const posts = await res.json();
    container.innerHTML = posts.map(p => `
      <article class="card">
        <h3>${escapeHTML(p.title)}</h3>
        <p>${escapeHTML(p.body)}</p>
        <a class="btn" href="edit.html?id=${p.id}">Editar</a>
      </article>
    `).join('');
  } catch (e) {
    container.innerHTML = `<div class="card">Erro ao carregar posts.</div>`;
  }
}

async function loadImages() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '<div class="card">Carregando imagens...</div>';
  try {
    const res = await fetch(API_PICSUM(2, 12));
    const imgs = await res.json();
    gallery.innerHTML = imgs.map(img => `
      <a href="${img.url}" target="_blank" rel="noopener">
        <img src="https://picsum.photos/id/${img.id}/400/300" alt="Foto por ${escapeHTML(img.author)}" loading="lazy" />
      </a>
    `).join('');
  } catch (e) {
    gallery.innerHTML = `<div class="card">Erro ao carregar imagens.</div>`;
  }
}

async function submitCreate(ev) {
  ev.preventDefault();
  const form = ev.currentTarget;
  const msg = document.getElementById('createMsg');

  const payload = {
    title: form.title.value.trim(),
    body: form.body.value.trim(),
    userId: 1
  };

  if (!payload.title || !payload.body) {
    msg.textContent = 'Preencha todos os campos.';
    return;
  }

  msg.textContent = 'Enviando...';
  try {
    const res = await fetch(API_POSTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    msg.textContent = `Post criado! (ID: ${data.id})`;
    form.reset();
  } catch (e) {
    msg.textContent = 'Falha ao criar post.';
  }
}

async function loadForEdit() {
  const form = document.getElementById('editForm');
  const id = Number(form.id.value);
  const msg = document.getElementById('editMsg');

  if (!id) {
    msg.textContent = 'Informe um ID válido.';
    return;
  }

  msg.textContent = 'Carregando...';
  try {
    const res = await fetch(`${API_POSTS}/${id}`);
    if (!res.ok) throw new Error();
    const post = await res.json();
    form.title.value = post.title;
    form.body.value = post.body;
    msg.textContent = 'Post carregado.';
  } catch (e) {
    msg.textContent = 'Não foi possível carregar o post.';
  }
}

async function submitUpdate(ev) {
  ev.preventDefault();
  const form = ev.currentTarget;
  const msg = document.getElementById('editMsg');

  const id = Number(form.id.value);
  if (!id) {
    msg.textContent = 'Informe o ID e carregue o post primeiro.';
    return;
  }

  const payload = {
    id,
    title: form.title.value.trim(),
    body: form.body.value.trim(),
    userId: 1
  };

  msg.textContent = 'Salvando...';
  try {
    const res = await fetch(`${API_POSTS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    msg.textContent = `Post atualizado! (ID: ${data.id})`;
  } catch (e) {
    msg.textContent = 'Falha ao atualizar.';
  }
}

async function handleDelete() {
  const form = document.getElementById('editForm');
  const msg = document.getElementById('editMsg');

  const id = Number(form.id.value);
  if (!id) {
    msg.textContent = 'Informe um ID válido para excluir.';
    return;
  }

  if (!confirm(`Deseja excluir o post ${id}?`)) return;

  msg.textContent = 'Excluindo...';
  try {
    const res = await fetch(`${API_POSTS}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error();
    msg.textContent = 'Post excluído (simulação).';
    form.reset();
  } catch (e) {
    msg.textContent = 'Falha ao excluir.';
  }
}

/* util */
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}
