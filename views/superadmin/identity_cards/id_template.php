<?php
$school_id = school_id();
?>
<!--title-->
<?php
        $enrols = $this->db->get_where('enrols', array('class_id' => $class_id, 'section_id' => $section_id, 'school_id' => $school_id, 'session' => active_session()))->result_array();
        foreach($enrols as $enroll){
          $student = $this->db->get_where('students', array('id' => $enroll['student_id']))->row_array();
          ?>
        <div class="col-lg-3.5" >
            <div class="card widget-flat"  style="content-align:center; margin:2px;">
              <div class="card-body" style="background-color: #7f5a83;
                background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);">
                <div class="float-right">
                  <i class="mdi mdi-account-multiple widget-icon"></i>
                </div>
                <div style=" display: flex;">
                    <img src="<?php echo $this->settings_model->get_logo_light(); ?>" style="float: left;height:25px; width:25px;"/>
                    <span class=" font-weight-bold" style="float: left; text-align:center; color:#fff; font-weight:bold; overflow:visible; font-size:13px;" title="Number of Student">BRAEBURN INTERNATIONAL SCHOOL</span>
                </div>
                <img src="<?php echo $this->user_model->get_user_image($student['user_id']); ?>" style="height:170px; width:150px; border: 2px solid #f2cf43; margin:20px 50px;
  border-radius: 25px;"/>
                <div style="text-align:center; color:#FFF;">
                    <p id="barcodeValue" style="font-size:17px; font-weight:bold; color:#FFF;"><?php echo $this->user_model->get_user_details($student['user_id'], 'name'); ?></p>
                    <p>Issued: <?php $monthNumb = date("m");  echo date("d")." ".date('M', mktime(0, 0, 0, $monthNum, 10)).", ".date("Y"); ?></p>
                    <p>Expire: <?php $monthNumb1 = date("m");  echo date("d")." ".date('M', mktime(0, 0, 0, $monthNum1, 10)).", ".date("Y"); ?></p>
                </div>
                <hr>
                <p class="mb-0 text-muted">
                    <center>
                        <div id="barcodeTarget" class="barcodeTarget"></div>
                    </center>
                </p>
              </div> <!-- end card-body-->
            </div> <!-- end card-->
        </div>
    <?php } ?>

        <!-- <div class="col-lg-4">
            <div class="card widget-flat"  style="on">
              <div class="card-body" style="background-color: #ffffff;
                background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);">
                <div class="float-right">
                  <i class="mdi mdi-account-multiple widget-icon"></i>
                </div>
                <h5 class=" font-weight-bold" style="text-align:center; overflow:visible;" title="Number of Student"><hr></h5>
                
                <div style="text-align:center; margin:163px 0px">
                    <p>This card is a property of <br>BRAEBURN INTERNATIONAL SCHOOL.<br> If found please return it to the school administration or to the police station</p>
                    
                </div>
                <hr>
                <p class="mb-0 text-muted">
                  <span class="text-nowrap">www.brieburn.com</span>
                </p>
              </div> 
            </div> 
        </div> -->
<script type="text/javascript">

    
      function generateBarcode(){
        var value = '23585985';
        var btype = 'std25';
        var renderer = "css"
        
 
        var settings = {
          output:renderer,
          bgColor: '#FFFFFF',
          color: '#000000',
          barWidth: '1',
          barHeight: '40',
          moduleSize: '5',
          posX: '10',
          posY: '20',
          addQuietZone: '1'
        };
        
        if (renderer == 'canvas'){
          clearCanvas();
          $("#barcodeTarget").hide();
          $("#canvasTarget").show().barcode(value, btype, settings);
        } else {
          $("#canvasTarget").hide();
          $("#barcodeTarget").html("").show().barcode(value, btype, settings);
        }
      }
          
      function showConfig1D(){
        $('.config .barcode1D').show();
        $('.config .barcode2D').hide();
      }
      
      function showConfig2D(){
        $('.config .barcode1D').hide();
        $('.config .barcode2D').show();
      }
      
      function clearCanvas(){
        var canvas = $('#canvasTarget').get(0);
        var ctx = canvas.getContext('2d');
        ctx.lineWidth = 1;
        ctx.lineCap = 'butt';
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle  = '#000000';
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        ctx.strokeRect (0, 0, canvas.width, canvas.height);
      }
      
      $(function(){
        // $('input[name=btype]').click(function(){
        //   if ($(this).attr('id') == 'datamatrix') showConfig2D(); else showConfig1D();
        // });
        // $('input[name=renderer]').click(function(){
        //   if ($(this).attr('id') == 'canvas') $('#miscCanvas').show(); else $('#miscCanvas').hide();
        // });
        generateBarcode();
      });
  
    </script>
    