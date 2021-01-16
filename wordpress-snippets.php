<?php if ( is_front_page() ) : ?>
<p>Hi</p>
<?php endif; ?>


/*---------------------------------------
    Shortcode
---------------------------------------*/
<?php echo do_shortcode("[contact-form-7 id=\"47\" title=\"send link\"]"); ?></div>


/*---------------------------------------
    Template
---------------------------------------*/
<?php
/*
Template Name: NameGoesHere
*/
get_header();
?>



// ---------------------------------------
    Loop paged
// ---------------------------------------
<?php
    $temp = $wp_query;
    $wp_query = new WP_Query(array(
        'post_type'      => 'post',
        'orderby'        => 'date',
        'paged'          => $paged,
        'posts_per_page' => 4,
        )
    );
?>
<?php while ($wp_query->have_posts()) : $wp_query->the_post(); ?>
    ...
<?php endwhile;?>
</ul>
<?php if (function_exists('wp_pagenavi')) {
    wp_pagenavi();
} ?>
<?php $wp_query = null; $wp_query = $temp; wp_reset_postdata();?>



// ---------------------------------------
    Loop
// ---------------------------------------
<?php
    $the_query = new WP_Query(
    array(
        'post_type'           => 'partner',
        'order'               => 'ASC',
        'posts_per_page'      => 12,
        'no_found_rows'       => true,
        'meta_query' => array(
            array(
                'key'     => 'case_study',
                'value'   => '"yes"',
                'compare' => 'LIKE'
            )
        )
        )
    );
?>
<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
...
<?php endwhile;?>
<?php wp_reset_postdata(); ?>


/*---------------------------------------
    Nav
---------------------------------------*/
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


/*---------------------------------------
    Icons
---------------------------------------*/
<svg class="o-icon" role="presentation">
    <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/dist/img/icons.svg#icon-chat"/>
</svg>


/*---------------------------------------
    Logo
---------------------------------------*/
<a href="<?php echo esc_url(home_url('/')); ?>" rel="home" class="c-logo">
    <?php include 'assets/img/logo.svg'; ?>
</a>

/*---------------------------------------
    ACF
---------------------------------------*/
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



/*---------------------------------------
    WP Customization
---------------------------------------*/
<?php if (get_theme_mod('phone_number')): ?>
<li>
    <svg class="o-icon" role="presentation">
        <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icons.svg#icon-tel"/>
    </svg>
    <?php echo get_theme_mod( 'phone_number' ); ?>
</li>
<?php endif; ?>


/*---------------------------------------
    Custom prev next
---------------------------------------*/
<?php
    $all_posts = new WP_Query(array(
        'post_type'           => 'partner',
        'order'               => 'ASC',
        'no_found_rows'       => true,
        'meta_query' => array(
            array(
                'key'     => 'case_study',
                'value'   => '"yes"',
                'compare' => 'LIKE'
            )
        )
    ));
    foreach($all_posts->posts as $key => $value) {
        if($value->ID == $post->ID){
            $nextID = $all_posts->posts[$key + 1]->ID;
            $prevID = $all_posts->posts[$key - 1]->ID;
            break;
        }
    }
?>
<div class="c-section  c-section--sm">
    <div class="o-container">
        <div class="c-grid  c-grid--2x2  c-grid--prevnext">
            <div>
                <?php if($prevID): ?>
                <p><span>«</span>Previous Case Study</p>
                <h3><a href="<?= get_the_permalink($prevID) ?>" rel="prev"><?= get_the_title($prevID) ?></a></h3>
                <?php endif; ?>
            </div>
            <div>
                <?php if($nextID): ?>
                <p>Next Case Study<span>»</span></p>
                <h3><a href="<?= get_the_permalink($nextID) ?>" rel="next"><?= get_the_title($nextID) ?></a></h3>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

/*---------------------------------------
    Related posts
---------------------------------------*/
<?php
$related_query = new WP_Query(array(
    'post_type' => 'post',
    'category__in' => wp_get_post_categories(get_the_ID()),
    'post__not_in' => array(get_the_ID()),
    'posts_per_page' => 3,
    'orderby' => 'date',
));
?>
<?php if ($related_query->have_posts()) { ?>
<div class="c-grid--3x3">
    <?php while ($related_query->have_posts()) { ?>
        <?php $related_query->the_post(); ?>
        <div class="c-postcard">
            <a href="<?php the_permalink(); ?>" class="c-postcard__thumb">
                <?php the_post_thumbnail('project_thumb'); ?>
            </a>
            <ul class="c-postcard__cats  o-listcomma  u-lines--1">
                <?php
                $category = get_the_category();
                $allcategory = get_the_category();
                foreach ( $allcategory as $category ) {
                    printf( '<li><a href="%1$s" class="c-link--bold">#%2$s</a></li>',
                        esc_url( get_category_link( $category->term_id ) ),
                        esc_html( $category->name )
                    );
                }?>
            </ul>
            <h3 class="c-postcard__title  c-txt--h3"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
        </div>
    <?php } ?>
</div>
<?php wp_reset_postdata(); ?>
<?php } ?>
