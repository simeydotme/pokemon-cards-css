import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: () => ({
      server: {
        watch: {
          usePolling: true,
        }
      }
    })
	}
};

export default config;
