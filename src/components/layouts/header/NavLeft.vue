<template>
	<ul class="nav navbar-nav">
		<router-link to="/" tag="li" exact>
      <a>Home</a>
    </router-link>
		<router-link to="/" tag="li" exact>
      <a>Relatórios</a>
    </router-link>
	</ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .nav.navbar-nav {
    margin-left: 30px;
  }
</style>
