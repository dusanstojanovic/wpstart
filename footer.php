</main>

<footer>
    <div class="">
        <ul class="c-social">
            <?php if( get_theme_mod( 'twitter_url' , '') !== '' ) : ?>
            <li class="c-social__item"><a href="<?php echo get_theme_mod( 'twitter_url', '' ); ?>" target="_blank" rel="noopener noreferrer" class="c-social__link">Tw</a></li>
            <?php endif; ?>
            <?php if( get_theme_mod( 'facebook_url' , '') !== '' ) : ?>
            <li class="c-social__item"><a href="<?php echo get_theme_mod( 'facebook_url', '' ); ?>" target="_blank" rel="noopener noreferrer" class="c-social__link">Fb</a></li>
            <?php endif; ?>
            <?php if( get_theme_mod( 'instagram_url' , '') !== '' ) : ?>
            <li class="c-social__item"><a href="<?php echo get_theme_mod( 'instagram_url', '' ); ?>" target="_blank" rel="noopener noreferrer" class="c-social__link">In</a></li>
            <?php endif; ?>
            <?php if( get_theme_mod( 'linkedin_url' , '') !== '' ) : ?>
            <li class="c-social__item"><a href="<?php echo get_theme_mod( 'linkedin_url', '' ); ?>" target="_blank" rel="noopener noreferrer" class="c-social__link">Li</a></li>
            <?php endif; ?>
        </ul>
    </div>
</footer>

<?php wp_footer(); ?>


<!-- for browser sync (remove on production): -->
<script id="__bs_script__">//<![CDATA[
    document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.26.5'><\/script>".replace("HOST", location.hostname));
//]]></script>
<!-- for browser sync (remove on production): -->

</body>
</html>
