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
        'itemtag'    => 'figure',
        'captiontag' => 'figcaption',
        'columns'    => 3,
        'size'       => 'thumb_gallery',
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
        <div class=\"c-galleryholder\">
        <div class=\"c-gallery__prev\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"34\" height=\"7\" viewBox=\"0 0 34 7\"><path d=\"M3.614 7L0 3.5 3.614 0l.707.683-2.36 2.336L34 3v1H2l2.321 2.317z\"/></svg></div>
        <div class=\"c-gallery__next\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"34\" height=\"7\" viewBox=\"0 0 34 7\"><path d=\"M30.386 7l-.707-.683L32 4H0V3l32.039.019-2.36-2.336.707-.683L34 3.5z\"/></svg></div>
        <div class=\"c-gallery  js-gallery\">\n
            <div class=\"swiper-wrapper\">\n"
    );

    // Iterate through the attachments in this gallery instance
    $i = 0;
    $digits = 5;
    $index = rand(pow(10, $digits-1), pow(10, $digits)-1);
    foreach ( $attachments as $id => $attachment ) {

        // Attachment link
        $link = isset( $attr['link'] ) && 'file' == $attr['link'] ? wp_get_attachment_link( $id, $size, false, false ) : wp_get_attachment_link( $id, $size, true, false );

        // Start itemtag
        $output .= "<{$itemtag} class='c-gallery__item  swiper-slide'>\n";

        // icontag
        $link = str_replace('<a','   <a data-fancybox="gallery-'.$index.'" data-caption="' . wptexturize($attachment->post_excerpt) . '"   ',$link);
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
    </div>\n
    </div>\n
    <div class=\"swiper-pagination\">\n
    </div>\n
    </div>";

    return $output;

}

// Apply filter to default gallery shortcode
add_filter( 'post_gallery', 'my_post_gallery', 10, 2 );
?>
