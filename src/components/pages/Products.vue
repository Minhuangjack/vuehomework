<template>
    <div>
        <div class="text-right mt-4" style="text-align:right">
            <!-- <button class="btn btn-primary" data-toggle="modal" data-target="#productModal">建立新的產品</button> -->
            <button class="btn btn-primary" v-on:click="openModel">建立新的產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="120">原價</th>
                    <th width="120">售價</th>
                    <th width="100">是否啟用</th>
                    <th width="80">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key)  in products" :key="item.id">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td class="text-right">{{ item.origin_price }}</td>
                    <td class="text-right">{{ item.price }}</td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm">編輯</button>                    
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Modal -->
        <!-- Modal -->
        <div class="modal fade" id="productModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div> 
    </div>
</template>

<script>
/* global $ */
import $ from 'jquery'

export default {
    data(){
        return {
            products: [],
        }
    },
    methods:{
        getProducts(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/products`
            const vm = this;
            console.log(process.env.APIPATH, process.env.CUSTOMERPATH);
            this.$http.get(api).then((resopnse)=>{
                console.log(resopnse.data);
                vm.products = resopnse.data.products;
            })
        },
        openModel(){
            // $('#productModel').model('show');
            this.getProducts();
            $('#productModel')
            console.log($('#productModel'));
        }
    },
    created() {
        // this.getProducts();
        this.getProducts();    
    }
    
}
</script>