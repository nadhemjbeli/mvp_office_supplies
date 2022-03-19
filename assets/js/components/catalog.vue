<template>
    <div>
        <div class="row">
            <div class="col-12">
                <title-component :text="product.name" />
            </div>
            <div class="col-9">
                <search-bar @search-products="onSearchProducts" />
            </div>
        </div>
        <div class="row">
            <product-list
                :products="products"
                :loading="loading"
            />
        </div>
        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import { fetchProducts } from '@/services/products-service';
import legendComponent from '@/components/legend';
import ProductList from '@/components/product-list';
import TitleComponent from '@/components/title';
import SearchBar from '@/components/search-bar';

export default {
    name: 'Catalog',
    components: {
        SearchBar,
        legendComponent,
        ProductList,
        TitleComponent,
    },
    props: {
        currentCategoryId: {
            type: String,
            default: null,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            products: [],
            loading: false,
            searchTerm: null,
            legend: 'Shipping takes 10-12 weeks, and products probably won\'t work',
        };
    },
    computed: {
        categoryName() {
            if (this.currentCategoryId === null) {
                return 'All Products';
            }

            const category = this.categories.find((cat) => (cat['@id'] === this.currentCategoryId));

            return category ? category.name : '';
        },
    },
    watch: {
        currentCategoryId() {
            this.loadProducts();
        },
    },
    created() {
        this.loadProducts();
    },
    methods: {
        /**
       * Handles a change in the searchTerm provided by the search bar and fetches new products
       *
       * @param {string} term
       */
        onSearchProducts({ term }) {
            this.searchTerm = term;
            this.loadProducts();
        },
        async loadProducts() {
            this.loading = true;

            let response;
            try {
                response = await fetchProducts(this.currentCategoryId, this.searchTerm);

                this.loading = false;
            } catch (e) {
                this.loading = false;
                return;
            }
            this.products = response.data['hydra:member'];
        },
    },
};
</script>
