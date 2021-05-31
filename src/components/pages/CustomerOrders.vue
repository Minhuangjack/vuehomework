<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
            <div class="card border-0 shadow-sm">
                <div style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
                <div class="card-body"></div>
                <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                <h5 class="card-title">
                    <a href="#" class="text-dark">{{item.title}}</a>
                </h5>
                <p class="card-text">{{item.content}}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                    <!-- <div class="h5">2,800 元</div> -->
                    <div class="h5" v-if="!item.price">{{item.origin_price | currency}}</div>
                    <del class="h6" v-if="item.price">{{item.origin_price | currency}}</del>
                    <div class="h5" v-if="item.price">{{item.price | currency}}</div>
                </div>
                </div>
                <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    查看更多
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id, 1)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    加到購物車
                </button>
                </div>
            </div>
        </div>
        <!-- 購物車內容 -->
        <div class="my-5 row justify-content-center">
             <div class="my-5 row justify-content-center">
                <table class="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)" >
                            <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                        <td class="align-middle">
                            {{ item.product.title }}
                            <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle text-right">{{ item.final_total }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right">{{ cart.total }}</td>
                        </tr>
                        <tr v-if="cart.final_total !== cart.total ">
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success">{{ cart.final_total }}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="input-group mb-3 input-group-sm">
                    <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                            套用優惠碼
                        </button>
                    </div>
                </div>
             </div>
        </div>

        <div class="my-5 row justify-content-center">
            <!-- 3.0 使用方法 -->
            <validation-observer class="col-md-6" v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="handleSubmit(submitForm)">
                    <validation-provider rules="required|email" v-slot="{ errors, classes }">
                        <div class="form-group" >
                            <!-- 輸入框 -->
                            <label for="email">Email</label>
                            <input id="email" type="email" name="email"  v-model="form.user.email" :class="classes"
                                class="form-control">
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="username">收件人姓名</label>
                            <input type="text" class="form-control" name="name" id="username" :class="classes"
                                v-model="form.user.name"  placeholder="輸入姓名">
                                <span class="invalid-feedback" >{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="usertel">收件人電話</label>
                            <input type="tel" class="form-control" name="usertel" id="usertel" :class="classes"
                                v-model="form.user.usertel" placeholder="請輸入電話">
                            <span class="invalid-feedback" >{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                    <validation-provider rules="required" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="useraddress">收件人地址</label>
                            <input type="text" class="form-control" name="address" id="useraddress"
                                    v-model="form.user.address" placeholder="請輸入地址">
                            <span class="invalid-feedback" >{{ errors[0] }}</span>
                        </div>
                    </validation-provider>
                    <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                    <div class="text-right">
                        <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                    </div>
                    <!-- 2.0 使用方法 -->
                    <!--
                         
                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" class="form-control" name="usertel" id="usertel" v-model="form.user.tel" 
                            v-validate="'required'" placeholder="請輸入電話">
                        <span class="text-danger" v-if="errors.has('usertel')">請輸入電話</span>
                    </div>
                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                            v-validate="'required'" placeholder="請輸入地址">
                        <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                    </div> 
                    <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                    -->
                </form>
            </validation-observer>
        </div>

         <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img :src="product.image" class="img-fluid" alt="">
                            <blockquote class="blockquote mt-3">
                            <p class="mb-0">{{ product.content }}</p>
                            <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                            </blockquote>
                            <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                            <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                            <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                            </div>
                            <select name="" class="form-control mt-3" v-model="product.num">
                            <option :value="num" v-for="num in 10" :key="num">
                                選購 {{num}} {{product.unit}}
                            </option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ product.num * product.price }}</strong> 元
                            </div>
                            <button type="button" class="btn btn-primary"
                            @click="addtoCart(product.id, product.num)">
                            <!-- <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i> -->
                            加到購物車
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    </div>     
  </div>
</template>

<script>
import $ from 'jquery';

export default {
    data(){
        return{
            products: [],
            product:{},
            isLoading: false,
            status:{
                loadingItem:'',
            },
            cart: {},
            coupon_code:'',
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:'',
            },
        }
    },
    methods: {
        getProducts(page = 1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/products?page=${page}`
            const vm = this;
            console.log(process.env.APIPATH, process.env.CUSTOMERPATH);
            vm.isLoading = true;
            this.$http.get(api).then((response)=>{
                console.log(response.data);
                vm.isLoading = false;
                vm.products = response.data.products;
                vm.pagination = response.data.pagination;
            })
        },
        getProduct(id){
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/product/${id}`;
            const vm = this;
            vm.status.loadingItem = id;
            console.log(id);
            this.$http.get(url).then((response)=>{
                vm.isLoading = false;
                vm.product = response.data.product;
                console.log(response);
                $('#productModal').modal('show');
                vm.status.loadingItem = '';
            })            
        },
        addtoCart(id, qty = 1){
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart`;
            const vm = this;
            vm.status.loadingItem = id;
            const cart = {
                product_id : id,
                // qty : qty // 與下方寫法一致
                qty          // 與上方寫法一致
            }
            this.$http.post(url, {data: cart}).then((response)=>{
                console.log(response);
                vm.status.loadingItem = '';
                vm.getCart();
                $('#productModal').modal('hide');                
            })  
        },
        getCart(){
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(url).then((response)=>{
                console.log(response);
                vm.cart = response.data.data;
                vm.isLoading = false;
            })     
        },
        removeCartItem(id){
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.delete(url).then(()=>{
                vm.getCart();
                vm.isLoading = false;
            })
        },
        addCouponCode(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/coupon`;
            const coupon={
                code:vm.coupon_code
            }
            vm.isLoading = true;
            this.$http.post(url, { data: coupon}).then(()=>{
                vm.getCart();
                vm.isLoading = false;
            })
        },
        submitForm(){
            console.log('送出表單');
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/order`;
            const order= vm.form;
            vm.isLoading = true;
            this.$http.post(url, { data: order}).then((response)=>{
                        console.log('訂單已建立', response);
                        if(response.data.success){
                            vm.$router.push(`/customer_checkout/${response.data.orderId}`)
                        }
                        vm.isLoading = false;
                    })            
            // 2.0 寫法
            // this.$validator.validate().then((result) =>{
            //     if(result){
            //         this.$http.post(url, { data: order}).then((response)=>{
            //             console.log('訂單已建立', response);
            //             vm.isLoading = false;
            //         })
            //     } else {
            //         console.log( '欄位不完整');
            //         vm.isLoading = false;
            //     }
            // });
            
            
        },
    },
    created() {
        this.getProducts();
        this.getCart();
    }
}

</script>