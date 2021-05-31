<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled': !pagination.has_pre }">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="updatePage(pagination.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page"
                    :class="{'active':page === pagination.current_page}">
                    <a class="page-link" href="#" @click.prevent="updatePage(page)" >{{page}}</a>
                </li>
                <li class="page-item" :class="{ 'disabled': !pagination.has_next }">
                                                                    <!-- 元件內部寫觸發事件 -->
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
   export default{
        name: 'Pagination',
        props: ['pagination'],
        methods:{
            updatePage(page){
                // 將此事件命名 並傳遞參數
                this.$emit('emitPages', page);
            }
        }
   } 
</script>