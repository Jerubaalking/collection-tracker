<?php
$school_id = school_id();
$check_data = $this->db->get_where('bonuses', array('school_id' => $school_id));
if($check_data->num_rows() > 0):?>
<table id="basic-datatable" class="table table-striped dt-responsive nowrap" width="100%">
    <thead>
        <tr style="background-color: #313a46; color: #ababab;">
            <th><?php echo get_phrase('name'); ?></th>
            <th><?php echo get_phrase('amount'); ?></th>
            <th>Action</th>
            
        </tr>
    </thead>
    <tbody>
        <?php
        $bonuses = $this->db->get_where('bonuses', array('school_id' => $school_id))->result_array();
        foreach($bonuses as $bonus){
            ?>
            <tr>
                <td><?php echo $bonus['name']; ?></td>
                <td><?php echo $bonus['amount']; ?></td>     
                <td>
                <div class="dropdown text-center">
                        <button type="button" class="btn btn-sm btn-icon btn-rounded btn-outline-secondary dropdown-btn dropdown-toggle arrow-none card-drop" data-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-vertical"></i></button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <!-- item-->
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item" onclick="rightModal('<?php echo site_url('modal/popup/bonuses/edit/'.$bonus['id']); ?>', '<?php echo get_phrase('update_bonus'); ?>')"><?php echo get_phrase('edit'); ?></a>
                            <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item" onclick="confirmModal('<?php echo route('bonuses/delete/'.$bonus['id']); ?>', showAllBonuses)"><?php echo get_phrase('delete'); ?></a>
                        </div>
                    </div>
                </td>
            </tr>
        <?php } ?>
    </tbody>
</table>
<?php else: ?>
    <?php include APPPATH.'views/backend/empty.php'; ?>
<?php endif; ?>
