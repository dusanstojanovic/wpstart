<?php if ( is_front_page() ) : ?>
<p>Hi</p>
<?php endif; ?>

<?php echo do_shortcode("[contact-form-7 id=\"47\" title=\"send link\"]"); ?></div>

<?php
/*
Template Name: Page Template - About the app
*/
get_header();
?>

<nav class="c-header__nav">
    <?php
        wp_nav_menu(
            array(
                'container' => '',
                'theme_location' => 'main-menu',
                'menu_class' => 'c-nav-main',
                'link_before' => '<span>',
                'link_after' => '</span>',
            )
        );
    ?>
</nav>

<svg class="o-icon" role="presentation">
    <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icons.svg#icon-chat"/>
</svg>

<a href="<?php echo esc_url(home_url('/')); ?>" rel="home" class="c-logo">
    <?php include 'assets/img/logo.svg'; ?>
</a>

<?php if( get_field('page_subtext') ): ?>
    <p><?php the_field('page_subtext'); ?></p>
<?php endif; ?>

<?php
    $image = get_field('page_hero_image');
    $size = 'hero_pic'; // (thumbnail, medium, large, full or custom size)
    if( $image ) {
        echo wp_get_attachment_image( $image, $size );
    }
?>

<?php if (get_theme_mod('phone_number')): ?>
<li>
    <svg class="o-icon" role="presentation">
        <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icons.svg#icon-tel"/>
    </svg>
    <?php echo get_theme_mod( 'phone_number' ); ?>
</li>
<?php endif; ?>
