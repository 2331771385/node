# 在views中，layouts子目录下的文件都是布局文件，在view目录下的.handlebars文件都是视图文件。在运行的js文件中，可以在渲染视图的时候使用layout属性指定所用的布局。比如：res.render('home', {layout: weather})这个意思就是在渲染home视图文件的时候，使用的布局是layouts文件下面的weather布局。
