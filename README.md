# EasyRouter in TypeScript

## Typescript
```
tsc ./js/app.ts -w --sourcemap --module "amd"
```

## Using
Required jQuery and SystemJS
```
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.20.9/system.js"></script>
	
	<script>
		SystemJS.import('./js/app.js');
	</script>
```

## Host

Example with installed php you can host project with this command:
```
php -S localhost:8000
```