<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="<?php echo get_stylesheet_directory_uri(); ?>/js/modernizr-custom.js"></script>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<header>
    <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
        <?php include "img/logo.svg"; ?>
    </a>
    <nav role="navigation">
        <?php
            wp_nav_menu(
                array(
                    'container' => '',
                    'container_class' => '',
                    'theme_location' => 'primary',
                    'container_id' => '',
                    'menu_class' => 'c-nav-main__list',
                )
            );
        ?>
    </nav>
    <button class="c-hamburger  js-show-menu">
        <span></span>
    </button>
</header>

<main>
