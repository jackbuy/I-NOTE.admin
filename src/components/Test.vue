<template>
    <div>{{ msg }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  @Prop() private msg!: string;
}
</script>