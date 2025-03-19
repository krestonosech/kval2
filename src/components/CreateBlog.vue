<template>
  <div class="class-class">
		<h1>{{props.title ? 'Изменение' : 'Создание'}} записи</h1>
		<textarea class="title" placeholder="Введите название записи" v-model="title"/>
		<textarea class="text" placeholder="Введите текст записи" v-model="text"/>
		<div class="buttons">
			<button @click="close">Отменить</button>
			<button @click="create">{{props.title ? 'Изменить' : 'Создать'}} запись</button>
		</div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { TableBlogs } from '@/types';
import axios from 'axios';
import { ref, defineProps } from 'vue';

const props = defineProps<{
	id?: number;
	title?: string;
	text?: string;
}>()

const title = ref(props.title || '')
const text = ref(props.text || '')

async function create() {
	if (!title.value || !text.value) return
  try {

		if ( props.id) {
		const data = {
      access_token: localStorage.getItem('token'),
			blog_id: props.id,
      title: title.value,
      text: text.value,
    }

		await axios.post('http://127.0.0.1:5000/edit_blog', data)
		} else {
			const data = {
      access_token: localStorage.getItem('token'),
      title: title.value,
      text: text.value,
    }

		await axios.post('http://127.0.0.1:5000/add_blog', data)
		}

  } finally {
    close()
  }
}

function close() {
	title.value = ''
	text.value = ''
	router.push('main')
}
</script>

<style scoped>
.class-class {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
}

.title {
	width: 90%;
	height: 50px;
}
.text {
	width: 90%;
	line-height: 1;
	height: 400px;
}

.buttons {
	position: fixed;
	display: flex;
	gap: 12px;
	bottom: 0;
	right: 0;
	margin-bottom: 30px;
	margin-right: 5%;
}
</style>
