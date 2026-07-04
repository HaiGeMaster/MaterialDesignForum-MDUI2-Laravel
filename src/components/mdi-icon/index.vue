<template>
    <mdui-icon :style="styles" :variant="variant" >
        
        <span :class="`${classs} ${icon}`" :style="span_style"></span>
        <slot></slot>
    </mdui-icon>
</template>
<script>
export default {
    name: 'mdi-icon',
    props:{
        icon:{
            type:String,
            default:''
            //default:'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
        },
        // color:{
        //     type:String,
        //     default:''
        // },
        classs:{
            type:String,
            default:'mdi',
        },
        styles:{
            type:String,
            default:'',
        },
        viewBox:{
            type:String,
            default:'0 0 24 24',
        },
        variant:{
            type:String,
            default:'standard',
        },
        span_style:{
            type:String,
            default:'',
        },
    }
};
</script>