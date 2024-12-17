<template>
  <div class="msg-container">
    <div class="title-container">
      <!--
      <div>thread page</div>
      <div>{{ route.params.id }}</div>
      -->
      <h1>Thread : {{threadName}}</h1>
    </div>
    <div v-if="isAuthenticated" class="new-msg-container">
      <input
            v-model="newMessage"
            placeholder="Nouveau message"
          />
          <button @click="postMessage">
            Envoyer
          </button>
    </div>
    <div v-if="posts.length" class="msg-list">
      <div 
        v-for="(post, index) in posts" 
        :key="index"
        class="msg-item" 
      >
        <div v-if="editingPostId === post.id" class="duo-btn">
          <input v-model="editMessage" class="edit-msg-input" />
          <button @click="updatePost(post.id, index)" class="update-btn">Mettre à jour</button>
          <button @click="cancelEdit" class="delete-btn">Annuler</button>
        </div>
        <div>
          <div class="msg-content">
            <div class="msg-header">
              <div class="author-container">
                <!--
                <img v-if="post.authorAvatar" 
                :src="'https://forum-fsd49.onrender.com' + post.authorAvatar" 
                alt="Avatar" 
                class="avatar-img" />
                -->
                <img v-if="post.authorAvatar" 
                :src="post.authorAvatar" 
                alt="Avatar" 
                class="avatar-img" />
              <div><strong class="author-desktop">Auteur:</strong> {{ post.authorName }}</div>
              </div>
              <div class="date-container"><strong class="date-desktop">Date de publication:</strong> {{ new Date(post.publication_date).toLocaleString() }}</div>
            </div>
            <div class="post-content">
              {{ post.content }}
            </div>
          </div>
          <div v-if="isAuthenticated && isAuthor(post.author_id)" class="duo-btn">
            <button @click="editPost(post.id, post.content)" class="edit-btn">Éditer</button>
            <button @click="deletePost(post.id, index)" class="delete-btn">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../http-common';
import { useAuthStore } from '../stores/authStore';
import { jwtDecode } from 'jwt-decode';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.token !== null);
const route = useRoute();
const posts = ref([]);
const newMessage = ref('');
const editMessage = ref('');
const editingPostId = ref(null);
const threadName = ref('');

const fetchPosts = async () => {
  const threadId = route.params.id;

  try {
    const threadResponse = await axios.get(`/threads/${threadId}`);
    threadName.value = threadResponse.data[0].title;

    const response = await axios.get(`/posts/thread/${threadId}`);
    posts.value = response.data;

    for (const post of posts.value) {
      const authorResponse = await axios.get(`/users/${post.author_id}`);
      post.authorName = authorResponse.data[0].username;
      post.authorAvatar = authorResponse.data[0].avatar_url ? authorResponse.data[0].avatar_url : null;
      console.log(post.authorAvatar);
    }
    posts.value.sort((a, b) => new Date(a.publication_date) - new Date(b.publication_date));
  } catch (error) {
    console.error('Erreur lors de la récupération du thread:', error);
  }
};

onMounted(fetchPosts);

const postMessage = async () => {
  if (!newMessage.value.trim()) return;
  try {
    const decodedToken = jwtDecode(authStore.token);
    const authorId = decodedToken.id;

    const response = await axios.post(`/posts`, {
      content: newMessage.value,
      thread_id: route.params.id,
      author_id: authorId
    });

    posts.value.push(response.data);
    newMessage.value = '';
    await fetchPosts();
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
  }
};

const editPost = (postId, content) => {
  editingPostId.value = postId;
  editMessage.value = content;
};

const updatePost = async (postId, index) => {
  try {
    await axios.put(`/posts/${postId}`, { content: editMessage.value });
    posts.value[index].content = editMessage.value;
    editingPostId.value = null;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
  }
};

const cancelEdit = () => {
  editingPostId.value = null;
};

const deletePost = async (postId, index) => {
  try {
    await axios.delete(`/posts/${postId}`);
    posts.value.splice(index, 1);  // Supprimer le post de la liste
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
  }
};

const isAuthor = (authorId) => {
  const decodedToken = jwtDecode(authStore.token);
  return decodedToken.id === authorId;
};
</script>
<style scoped>
.msg-container {
  display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 2rem;
    border-radius: 10px;
    border: 2px solid #333;
    background-color: #1e1e1e;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    color: white;
  }
  .title-container{
    color: white;
    display: flex;
    justify-content: center;
  }
  .msg-list {
    max-width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .msg-content {
    display: flex;
    flex-direction: column
  }
  .msg-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .avatar-img { 
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .author-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  .date-container {
    text-align: right;
    justify-self: end;
    /* flex-shrink: 0; */
  }
  .new-msg-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .new-msg-container input {
    padding: 0.41rem;
  }
  .new-msg-container button {
    margin-left: 0.25rem;
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    background-color: #4caf50;
    color: white;
  }
  .duo-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .edit-msg-input {
    padding: 0.3rem;
  }
  .delete-btn {
  height: 1.75rem;
  /* margin-left: auto; */
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #ff1744;
}
.edit-btn, .update-btn {
  margin-right: 0.25rem;
  padding: 0.5rem;
  height: 1.75rem;
  border-radius: 4px;
  border: none;
  background-color: #4caf50;
  color: white;
}
.update-btn{
  margin-left: 0.25rem;
}
.post-content{
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.msg-item {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  border-radius: 1rem;
  color:white;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 0.5rem;
  background: linear-gradient(to top, #272727, #333333);
  border-radius: 4px;
  transition: all 0.3s ease;
}
@media screen and (max-width: 860px) {
  .msg-list {
    max-width: 35rem;
  }
}
@media screen and (max-width: 610px) {
  .msg-list {
    max-width: 25rem;
  }
}
@media screen and (max-width: 450px) {
  .author-desktop{
    display: none;
  }
  .date-desktop{
    display: none;
  }
  .msg-list {
    width: 22rem;
  }
}
@media screen and (max-width: 380px) {
  .msg-list {
    width: 20rem;
  }
}
</style>