<template>
  <div class="class">
		<h3>{{ props.item.title }}</h3>
		<p>{{ props.item.text }}</p>
		<div class="icons">
			<div @click="addComment()" class="mdi mdi-comment-text-outline"></div>
			<div @click="router.push({path: '/create', query: {title: props.item.title, text: props.item.text, id: props.item.id}})" class="mdi mdi-pencil-outline"></div>
			<div @click="deleteBlog" class="mdi mdi-delete"></div>
		</div>
  </div>
	<div class="comments" v-if="isComment" >
		<textarea v-model="comment" placeholder="Оставить комментарий"/>
		<button @click="sendComment">{{isEdit ? 'Отредактировать' : 'Отправить'}}</button>
	</div>
	<div v-if="isComment" class="otherComments">
		<h3>Комментарии</h3>
		<div v-for="item in comments" :key="item.id" style="display: flex; flex-direction: row; justify-content: space-between;">
			<p>{{ item.username }}: {{ item.text }}</p>
			<div style="display: flex; flex-direction: row">
				<div v-if="item.username === username" @click="editMessage(item)" class="mdi mdi-pencil-outline"></div>
				<div v-if="item.username === username" @click="deleteComment(item.id)" class="mdi mdi-delete"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { TableBlogs, TableMessages } from '@/types';
import axios from 'axios';
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps<{
	item: TableBlogs;
}>()
const username = localStorage.getItem('username')
const isComment = ref(false)
const comment = ref('')
const comments = ref<TableMessages[]>([])
const isEdit = ref(false)
const emit = defineEmits(['success'])

async function deleteBlog() {
	try {
    const data = {
      access_token: localStorage.getItem('token'),
      blog_id: props.item.id,
    }

    await axios.post('http://127.0.0.1:5000/delete_blog', data)
  } finally {
    emit('success')
  }
}

async function addComment(item?: boolean | true) {
	try {
    const data = {
      access_token: localStorage.getItem('token'),
      blog_id: props.item.id,
			shift: 1,
			limit: 10,
    }

    const response = await axios.post('http://127.0.0.1:5000/get_messages', data)
		comments.value = response.data.messages
		if (!item) isComment.value = !isComment.value
  } finally {
		console.log('chort');
  }
}

async function sendComment() {
	try {
    const data = {
      access_token: localStorage.getItem('token'),
      blog_id: props.item.id,
			text: comment.value,
    }

    await axios.post('http://127.0.0.1:5000/add_message', data)
		comment.value = ''
		isEdit.value = false
		await addComment(true)
  } finally {
    emit('success')
  }
}

async function deleteComment(id: number) {
	try {
    const data = {
      access_token: localStorage.getItem('token'),
      message_id: id,
    }

    await axios.post('http://127.0.0.1:5000/delete_message', data)
		await addComment(true)
  } finally {
    emit('success')
  }
}

async function editMessage(item: TableMessages) {
	try {
    const data = {
      access_token: localStorage.getItem('token'),
      message_id: item.id,
    }

    await axios.post('http://127.0.0.1:5000/delete_message', data)
		comment.value = item.text
		isEdit.value = true
		await addComment(true)
  } finally {
    emit('success')
  }
}
</script>

<style scoped>
.otherComments {
	display: flex;
	flex-direction: column;
	justify-content: left;
	width: 40%;
}
.comments {
	display: flex;
	align-items: center;
	width: 40%;
	justify-content: center;
}
textarea {
	width: 100%;
}
ul {
	display: flex;
	justify-content: right;
	flex-direction: column;
}
.class {
	height: inherit !important;
	min-height: 100px !important;
	width: 40%;
	border: solid 1px white;
	border-radius: 10px;
	margin-bottom: 20px;
}
.mdi-heart {
	padding: 10px;
	font-size: 20px;
	color: red;
	cursor: pointer;
}
.mdi-comment-text-outline {
	padding: 10px;
	font-size: 20px;
	cursor: pointer;
}
.icons {
	display: flex;
  justify-content: right;
  align-items: center;
}
.mdi-dots-vertical {
	padding: 10px;
	cursor: pointer;
}
.title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.mdi-pencil-outline {
	padding: 10px;
	cursor: pointer;
	font-size: 20px;
}
.mdi-delete {
	padding: 10px;
	cursor: pointer;
	font-size: 20px;
}
</style>
