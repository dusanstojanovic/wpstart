<?php
// Custom filter function to modify default gallery shortcode output
function my_post_gallery( $output, $attr ) {

    // Initialize
    global $post, $wp_locale;

    // Gallery instance counter
    static $instance = 0;
    $instance++;

    // Validate the author's orderby attribute
    if ( isset( $attr['orderby'] ) ) {
        $attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
        if ( ! $attr['orderby'] ) unset( $attr['orderby'] );
    }

    // Get attributes from shortcode
    extract( shortcode_atts( array(
        'order'      => 'ASC',
        'orderby'    => 'menu_order ID',
        'id'         => $post->ID,
        'itemtag'    => 'div',
        'captiontag' => 'div',
        'columns'    => 3,
        'size'       => 'gallery-thumb',
        'include'    => '',
        'exclude'    => ''
    ), $attr ) );

    // Initialize
    $id = intval( $id );
    $attachments = array();
    if ( $order == 'RAND' ) $orderby = 'none';

    if ( ! empty( $include ) ) {

        // Include attribute is present
        $include = preg_replace( '/[^0-9,]+/', '', $include );
        $_attachments = get_posts( array( 'include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby ) );

        // Setup attachments array
        foreach ( $_attachments as $key => $val ) {
            $attachments[ $val->ID ] = $_attachments[ $key ];
        }

    } else if ( ! empty( $exclude ) ) {

        // Exclude attribute is present
        $exclude = preg_replace( '/[^0-9,]+/', '', $exclude );

        // Setup attachments array
        $attachments = get_children( array( 'post_parent' => $id, 'exclude' => $exclude, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby ) );
    } else {
        // Setup attachments array
        $attachments = get_children( array( 'post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby ) );
    }

    if ( empty( $attachments ) ) return '';

    // Filter gallery differently for feeds
    if ( is_feed() ) {
        $output = "\n";
        foreach ( $attachments as $att_id => $attachment ) $output .= wp_get_attachment_link( $att_id, $size, true ) . "\n";
        return $output;
    }

    // Filter tags and attributes
    $itemtag = tag_escape( $itemtag );
    $captiontag = tag_escape($captiontag);
    $columns = intval( $columns );
    $itemwidth = $columns > 0 ? floor( 100 / $columns ) : 100;
    $float = is_rtl() ? 'right' : 'left';
    $selector = "gallery-{$instance}";

    // Filter gallery CSS
    $output = apply_filters( 'gallery_style', "
        <!-- see gallery_shortcode() in wp-includes/media.php -->
        <div class=\"c-galleryholder\">
        <div class=\"c-gallery__prev\"></div>
        <div class=\"c-gallery__next\"></div>
        <div class=\"c-gallery  js-gallery\">\n
            <div class=\"swiper-wrapper\">\n"
    );

    // Iterate through the attachments in this gallery instance
    $i = 0;
    foreach ( $attachments as $id => $attachment ) {

        // Attachment link
        $link = isset( $attr['link'] ) && 'file' == $attr['link'] ? wp_get_attachment_link( $id, $size, false, false ) : wp_get_attachment_link( $id, $size, true, false );

        // Start itemtag
        $output .= "<{$itemtag} class='c-gallery__item  swiper-slide'>\n";

        // icontag
        $output .= "$link";

        // caption

            $output .= "
                <{$captiontag} class='c-gallery__caption'>
                " . wptexturize($attachment->post_excerpt) . "
                </{$captiontag}>";

        // End itemtag
        $output .= "</{$itemtag}>\n";



    }

    // End gallery output
    $output .= "
    </div><!--c-gallery-->\n
    </div><!--swiper-wrapper-->\n
    <div class=\"swiper-pagination\"></div></div>";

    return $output;

}

// Apply filter to default gallery shortcode
add_filter( 'post_gallery', 'my_post_gallery', 10, 2 );
?>
