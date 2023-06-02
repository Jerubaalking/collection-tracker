<!--title-->
<div class="row ">
  <div class="col-xl-12">
    <div class="card">
      <div class="card-body">
        <h4 class="page-title">
            <i class="mdi mdi-navigation title_icon"></i> <?php echo get_phrase('bonuses'); ?>
            <button type="button" class="btn btn-outline-primary btn-rounded alignToTitle" onclick="rightModal('<?php echo site_url('modal/popup/bonuses/create'); ?>', '<?php echo get_phrase('add_bonus'); ?>')"> <i class="mdi mdi-plus"></i> <?php echo get_phrase('add_bonus'); ?></button>
        </h4>
      </div> <!-- end card body-->
    </div> <!-- end card -->
  </div><!-- end col-->
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-body bonus_content">
                <?php include 'list.php'; ?>
            </div>
        </div>
    </div>
</div>

<script>
    var showAllBonuses = function () {
        var url = '<?php echo route('bonuses/list'); ?>';

        $.ajax({
            type : 'GET',
            url: url,
            success : function(response) {
                $('.bonus_content').html(response);
                initDataTable('basic-datatable');
            }
        });
    }
</script>
