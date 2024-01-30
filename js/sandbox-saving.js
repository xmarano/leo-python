(function($) {

    $(document).ready(function() {

        $('.btn-submit').click(function() {

            if ($('input[name="filename"]').length) {

                modal('#modal-checking', 'show');

                setTimeout(checkRevisions, 2500);

            } else

                $('form').submit();

        });



        $('.btn-save').click(function(e) {

            var btn = e.currentTarget;

            $('input[name="' + $(btn).data('field') + '"]').val(1);

            modal('#modal-save', 'hide');

            $('form').submit();

        });


        function checkRevisions() {

            var file = $('input[name="filename"]').val();

            var url_base = 'https://' + window.location.host;

            $.ajax({

                url: url_base + '/filedata/' + file,

                type: 'GET',

                dataType: 'json'

            }).done(function(json) {

                modal('#modal-checking', 'hide');

                if (json.hasLaterRevisions)

                    modal('#modal-save', 'show');

                else

                    $('form').submit();

            }).fail(function(xhr, status, errThrown) {

                modal('#modal-checking', 'hide');

                console.log('Error: ' + errThrown);

                modal('#modal-error', 'show');

            });

        }


        function modal(selector, action) {

            $(selector).modal(action);

        }



    });

})(jQuery);