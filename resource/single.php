<?php include('../header1.php');

$sql = "SELECT * FROM blog where `title`='".$_GET['title']."'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

 ?>	
<br>
<br>

      
    
  
      <div class="region region__admin">
      <div class="grid__container">
<div class="grid__container--items">

                <div data-drupal-messages-fallback class="hidden"></div>

      
      </div>
</div>
    </div>
  

  <main role="main" class="page--main">
    <a id="main-content" tabindex="-1"></a>
    
    <div class="layout-content">
      
      <div class="region region__content">
                    
                <div id="block-rum-base-content" data-block-plugin-id="system_main_block" class="block block-system block__system-main-block">
        <article role="article" about="/about/newsroom" class="node__page node__rum-page node__page--full node__rum-page--full node node--type-page node--view-mode-full">

  
    <div class="node__content">
      
                          <div class="t-layout__one-column edge-to-edge no-padding no-max-width layout__bg--none layout layout--atge-one-column" >
        <div class="grid__container">
          <div class="layout__regions grid__container--items" >
                                                </div>
        </div>
      </div>
      
                          <div class="t-layout__one-column edge-to-edge no-padding no-max-width layout__bg--none layout layout--atge-one-column" >
        <div class="grid__container">
          <div class="layout__regions grid__container--items" >
                                          <div  class="layout__region layout__region--main grid__container--item">
                  <div data-block-plugin-id="extra_field_block:node:page:links" class="block block-layout-builder block__extra-field-blocknodepagelinks">

  
    

    
      
  
    
</div>
<div data-block-plugin-id="inline_block:component_banner" data-inline-block-uuid="e47a9d59-d948-4fac-b1b2-3d79ec52786b" class="c-banner c-rum-banner block block-layout-builder block__inline-blockcomponent-banner">

  
    

    
      
  
      <div class="c-banner--items c-rum-banner--items paragraph paragraph--type--atge-banner paragraph--view-mode--default c-atge-banner c-atge-banner--default">
        
      <div class="c-banner--item c-rum-banner--item p-banner__bg-color--brand-primary p-banner__align--center-right c-banner__mobile--natural p-banner__align--vert-fill c-banner__layout--twocol paragraph paragraph--type--atge-banner-item paragraph--view-mode--default c-atge-banner-item c-atge-banner-item--default">
      
    

    
  <div class="p-rum-banner__media p-atge-banner-item--media p-banner__media ">
    
    
    
      </div>

      <div class="p-rum-banner__content p-atge-banner-item--content p-banner__content c-banner__content--items">
      
      <div class="c-banner__content--item c-banner__media--item c-rum-banner__content--item c-rum-banner__media--item has-objectfit paragraph paragraph--type--atge-banner-item-media paragraph--view-mode--default c-atge-banner-item-media c-atge-banner-item-media--default">
        <img  src="<?=SITEURL.$row['image']?>" typeof="foaf:Image" class="image-style-atge-no-style-lg" />


    </div>
  

      <div class="c-banner__content--item c-banner__text--item c-rum-banner__content--item c-rum-banner__text--item p-banner__txt-bg--plain p-banner__txt-color--light p-banner__width--full p-banner__mtx--drop p-banner__mtx-align--left paragraph paragraph--type--atge-banner-item-text paragraph--view-mode--default c-atge-banner-item-text c-atge-banner-item-text--default">
      
  <div class="c-banner__content--inner p-rum-banner__content--inner  c-banner__text--inner">      <h1 class="p-rum-banner--heading p-atge-banner-item-text--heading p-banner-heading">
      WUHS BLOG
      </h1>
    
    
          <div class="p-rum-banner--copy p-atge-banner-item-text--copy p-banner-copy">
        <hr />
      </div>
    
      </div>

    </div>
  

    </div>
  
    </div>
  

    </div>
  


  
    
</div>

                </div>
                                    </div>
        </div>
      </div>
      
                          <div class="t-layout__one-column edge-to-edge no-padding no-max-width layout__bg--none hide-on-desktop layout layout--atge-one-column" >
        <div class="grid__container">
          <div class="layout__regions grid__container--items" >
                                          <div  class="layout__region layout__region--main grid__container--item">
                  <div data-block-plugin-id="inline_block:component_richtext" data-inline-block-uuid="33902f3b-e88e-4c51-9001-74c16dfa6806" class="c-richtext c-rum-richtext block block-layout-builder block__inline-blockcomponent-richtext">

  
    

    
      
  
      <div class="c-richtext__content c-rum-richtext__content paragraph paragraph--type--atge-rich-text paragraph--view-mode--default c-atge-rich-text c-atge-rich-text--default">
        
      <div class="c-richtext__content--inner c-rum-richtext__content--inner">
      <p> </p>

<p> </p>

    </div>
      </div>
  


  
    
</div>

                </div>
                                    </div>
        </div>
      </div>
      
       <div class="t-layout__one-column standard-width layout__bg--none layout layout--atge-one-column" >
        <div class="grid__container">
          <div class="layout__regions grid__container--items" >
          <div  class="layout__region layout__region--main grid__container--item">
          <div data-block-plugin-id="inline_block:component_grid" data-inline-block-uuid="7e74f03c-20c5-4ffa-b2f9-1881ed679856" class="c-grid c-rum-grid block block-layout-builder block__inline-blockcomponent-grid">
          <div class="c-grid__content c-rum-grid__content p-banner__bg-color--none p-txt-align--left c-layout--fixed c-grid--content paragraph paragraph--type--atge-grid paragraph--view-mode--default c-atge-grid c-atge-grid--default">
          <div class="c-rum-grid__content--inner c-grid__content--inner">
                     <div class="c-rum-grid__header c-grid__header">
           <div class="c-rum-grid__header--copy c-grid__header--copy p-txt-color--dark">
                      <h3><br /><span style="color:#902117;"><?=$row['title']?></span></h3>
            <hr />
            
           </div>
           </div>
      <div class="c-view c-rum-view c-grid__layout--threecol p-txt-align--left paragraph paragraph--type--atge-view paragraph--view-mode--default c-atge-view c-atge-view--default">
      <div class="field field--name-field-atge-views-ref field--type-viewfield field--label-hidden">
      <div class="field__item field__item-label-hidden">
      <div class="views-element-container"><div class="view view-atge-news-tagged-listing view-id-atge_news_tagged_listing view-display-id-atge_news_tagged_featured_block js-view-dom-id-ecebe373d0d974c2750056e11f44758c9667f48a5fdb2e5c660ab60dbf46b5e8">
      <div class="view-content">
             <!--<div class="views-row">
       <article role="article" about="/about/blog/is-it-worth-going-to-medical-school" class="t-article t-rum-article t-article__grid t-rum-article__grid t-content-type__grid node node--type-atge-article node--view-mode-grid">
       <a href="#" title="Is It Worth Going to Medical School?" aria-label="Is It Worth Going to Medical School?" data-gtm=&#039;call-to-action&#039;>

              <div class="t-article__grid--type t-rum-article__grid--media t-content-type__grid--type">
        Blog
      </div>
    
              
        
      
          <div class="" style="height: 100%;max-width: 100%;">
                    <img src="images/blog/nac2-150x150.jpg" typeof="foaf:Image" class="image-style-atge-no-style-lg" />


            </div>
    
  

      
    
        

  </a>


  

</article>
</div>-->
    
    
 </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  <div class="c-rum-grid__header c-grid__header">
           <div class="c-rum-grid__header--copy c-grid__header--copy p-txt-color--dark">
                      <p><br /><?=$row['description']?></p>
            
            
           </div>
           </div>
  
  
  </div>
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>

  
</article>

  
    
</div>

      
                        </div>
  
    </div>
    
  </main>


<?php include('../footer1.php'); ?>	