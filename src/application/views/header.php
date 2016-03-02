<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>EShop<?php if (isset($pageTitle)) echo(' - ' . $pageTitle);?></title>
        <script type="text/javascript">
            var EShop = {
                baseUrl: '<?php echo(base_url()); ?>',
                siteUrl: '<?php echo(site_url()); ?>'
            };
        </script>
    </head>

    <body>
        <header>
            EShop
        </header>
