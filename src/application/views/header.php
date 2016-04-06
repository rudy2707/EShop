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
        <link rel="stylesheet" type="text/css" href="<?php echo(base_url('public/css/style.css')); ?>" >
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="<?php echo(base_url('public/bower_components/font-awesome/css/font-awesome.min.css')); ?>" >
        <link rel="stylesheet" type="text/css" href="<?php echo(base_url('public/bower_components/angular-material/angular-material.min.css')); ?>">
        <link rel="stylesheet" type="text/css" href="<?php echo(base_url('public/bower_components/angular-material-data-table/dist/md-data-table.min.css')); ?>">
    </head>

    <body ng-app="app" ng-cloak>
        <!-- <header>
            EShop
        </header> -->
        <div class="app" id="shop" ui-view>
        </div>
        <!-- <md-toolbar class="md-whiteframe-glow-z1 site-content-toolbar">
            <div layout="row" flex class="fill-height layout-row flex">
                <h2 class="md-toolbar-item md-breadcrumb md-headline">
                    <span class="md-breadcrumb">Introduction</span>
                </h2>
                <span flex class="flex"></span>
            </div>
        </md-toolbar>
        <md-content md-scroll-y layout="column" flex class="layout-column flex" ui-view>
        </md-content> -->
